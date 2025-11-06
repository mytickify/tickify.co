// Versión JavaScript del script para evitar problemas con TypeScript
import { PrismaClient } from "@/lib/generated/prisma/client";
import { auth } from "../lib/auth";

const prisma = new PrismaClient();

/**
 * Crea un nuevo usuario en la base de datos
 * @param {string} email - Email del usuario
 * @param {string} password - Contraseña en texto plano
 * @param {string} role - Rol del usuario (USUARIO, EDITOR, ADMIN_WEB)
 * @param {string} name - Nombre del usuario (opcional)
 */
async function createUser(
  email: string,
  password: string,
  role = "USUARIO",
  name?: string | null
) {
  try {
    // Verificar si el usuario ya existe
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      console.error(`❌ El usuario con email ${email} ya existe`);
      return null;
    }

    // Validar rol
    const validRoles = ["USUARIO", "EDITOR", "ADMIN_WEB"];
    if (!validRoles.includes(role)) {
      console.error(`❌ Rol inválido: ${role}. Debe ser uno de: ${validRoles.join(", ")}`);
      return null;
    }

     const { user } = await auth.api.signUpEmail({
      body: {
        name: name || email.split("@")[0],
        email,
        password,
      }
    });
    // Hash de la contraseña
    //const hashedPassword = await bcrypt.hash(password, 10);
    // Asegurar que el rol exista y vincularlo al usuario via tabla intermedia
    await prisma.role.upsert({
      where: { name: role },
      create: { name: role },
      update: {}
    });

    await prisma.user.update({
      where: { email },
      data: {
        roles: {
          create: {
            role: { connect: { name: role } }
          }
        }
      }
    });

    console.log(`✅ Usuario creado exitosamente: ${email} (${role})`);
    return user;
  } catch (error) {
    console.error("❌ Error al crear usuario:", error);
    return null;
  }
}

/**
 * Lista todos los usuarios en la base de datos
 */
async function listUsers() {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        createdAt: true,
        roles: {
          select: {
            role: { select: { name: true } },
            assignedAt: true,
          }
        }
      }
    });

    if (users.length === 0) {
      console.log("No hay usuarios registrados");
      return;
    }

    console.log("\n=== USUARIOS REGISTRADOS ===\n");
    users.forEach(user => {
      console.log(`ID: ${user.id}`);
      console.log(`Email: ${user.email}`);
      console.log(`Nombre: ${user.name || "No especificado"}`);
      const roleNames = (user.roles || [])
        .map(r => r.role?.name)
        .filter(Boolean)
        .join(", ") || "Sin roles";
      console.log(`Roles: ${roleNames}`);
      console.log(`Creado: ${user.createdAt}`);
      console.log("----------------------------");
    });
  } catch (error) {
    console.error("❌ Error al listar usuarios:", error);
  }
}

async function updateUser(
  email: string,
  role: string,
  name?: string | null
) {
  try {
    // Verificar si el usuario existe
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });
    
    if (!existingUser) {
      console.error(`❌ El usuario con email ${email} no existe`);
      return null;
    }
    // Validar rol
    const validRoles = ["USUARIO", "EDITOR", "ADMIN_WEB"];
    if (!validRoles.includes(role)) {
      console.error(`❌ Rol inválido: ${role}. Debe ser uno de: ${validRoles.join(", ")}`);
      return null;
    }
    const roleId = await prisma.role.findUnique({
      where: { name: role },
      select: { id: true }
    });
    if (!roleId) {
      console.error(`❌ El rol ${role} no existe`);
      return null;
    }

    // Actualizar el usuario
    await prisma.user.update({
      where: { email },
      data: {
        name: name || existingUser.name,
        roles: {
          upsert: {
            where: { userId_roleId: { userId: existingUser.id, roleId: roleId?.id } },
            create: {
              role: { connect: { name: role } }
            },
            update: {
              role: { connect: { name: role } }
            }
          }
        }
      }
    });

    console.log(`✅ Usuario actualizado exitosamente: ${email} (${role})`);
    return existingUser;
  } catch (error) {
    console.error("❌ Error al actualizar usuario:", error);
    return null;
  }
}

// Manejo de comandos desde la línea de comandos
async function main() {
  const command = process.argv[2];

  if (command === "create") {
    // Solicitar datos para crear usuario
    const email = process.argv[3] || "admin@example.com";
    const password = process.argv[4] || "admin123";
    const role = process.argv[5] || "ADMIN_WEB";
    const name = process.argv[6] || null;

    await createUser(email, password, role, name);
  } else if (command === "update") {
    // Solicitar datos para actualizar usuario
    const email = process.argv[3] || "admin@example.com";
    const role = process.argv[4] || "ADMIN_WEB";
    const name = process.argv[5] || null;

    await updateUser(email, role, name);
  } else if (command === "list") {
    await listUsers();
  } else {
    console.log("Comando no reconocido. Uso: node create-user.mjs [create|update|list]");
  }

  // Cerrar la conexión a la base de datos
  await prisma.$disconnect();
}

main().catch(e => {
  console.error(e);
  process.exit(1);
});