import React, { useState } from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useBuilder } from '../../context/BuilderContext';
import { SectionRegistry } from '../../utils';
import { SectionProps } from '../../types';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Boxes, Layers as LayersIcon, Settings as SettingsIcon, GripVertical, Trash2, BadgePercent, Images, Info, CalendarDays, Phone } from 'lucide-react';
import './BuilderSidebar.css';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';

interface SortableLayerItemProps {
  section: SectionProps;
  index: number;
  onSelect: (id: string) => void;
  onDelete: (id: string) => void;
  isSelected: boolean;
}

const SortableLayerItem: React.FC<SortableLayerItemProps> = ({
  section,
  index,
  onSelect,
  onDelete,
  isSelected
}) => {
  const [deleteOpen, setDeleteOpen] = React.useState(false);
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: section.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`layer-item ${isSelected ? 'selected' : ''}`}
    >
      <div className="layer-drag-handle" {...attributes} {...listeners}>
        <GripVertical className="h-4 w-4" />
      </div>
      <div className="layer-content" onClick={() => onSelect(section.id)}>
        <span className="layer-index">{index + 1}</span>
        <span className="layer-type">{section.type}</span>
      </div>
      <button
        className="layer-delete"
        onClick={(e) => {
          e.stopPropagation();
          setDeleteOpen(true);
        }}
      >
        <Trash2 className="h-4 w-4" />
      </button>

      <Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Eliminar sección</DialogTitle>
            <DialogDescription>Esta acción no se puede deshacer.</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteOpen(false)}>Cancelar</Button>
            <Button variant="destructive" onClick={() => { setDeleteOpen(false); onDelete(section.id); }}>Eliminar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

const BuilderSidebar: React.FC = () => {
  const { state, addSection, updateSection, deleteSection, selectSection, reorderSections } = useBuilder();
  const { page, selectedSectionId } = state;
  const [activeTab, setActiveTab] = useState<'sections' | 'layers' | 'settings'>('sections');

  const sections = SectionRegistry.getAllSections();
  const selectedSection = page?.sections.find(s => s.id === selectedSectionId);

  const handleAddSection = (type: any) => {
    const newSection = SectionRegistry.createSection(type);
    addSection(newSection);
  };

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id && page) {
      const oldIndex = page.sections.findIndex((s) => s.id === active.id);
      const newIndex = page.sections.findIndex((s) => s.id === over.id);

      if (oldIndex !== -1 && newIndex !== -1) {
        reorderSections(oldIndex, newIndex);
      }
    }
  };

  const handleUpdateSectionData = (field: string, value: any) => {
    if (!selectedSectionId) return;
    updateSection(selectedSectionId, {
      data: {
        ...selectedSection?.data,
        [field]: value
      }
    } as Partial<SectionProps>);
  };

  const [editorDeleteOpen, setEditorDeleteOpen] = useState(false);

  const renderSectionEditor = () => {
    if (!selectedSection) {
      return (
        <div className="no-selection">
          <p>Selecciona una sección para editarla</p>
        </div>
      );
    }

    const { data } = selectedSection;

    return (
      <div className="section-editor">
        <div className="editor-header">
          <h3>{selectedSection.type}</h3>
          <button
            className="delete-button"
            onClick={() => setEditorDeleteOpen(true)}
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>

        <div className="editor-fields">
          {Object.entries(data).map(([key, value]) => {
            if (typeof value === 'string') {
              return (
                <div key={key} className="editor-field">
                  <label>{key}</label>
                  {key === 'content' || value.length > 100 ? (
                    <textarea
                      value={value}
                      onChange={(e) => handleUpdateSectionData(key, e.target.value)}
                      rows={4}
                    />
                  ) : (
                    <input
                      type="text"
                      value={value}
                      onChange={(e) => handleUpdateSectionData(key, e.target.value)}
                    />
                  )}
                </div>
              );
            }
            return null;
          })}
        </div>

        <div className="editor-actions">
          <button onClick={() => selectSection(null)}>Cerrar</button>
        </div>

        <Dialog open={editorDeleteOpen} onOpenChange={setEditorDeleteOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Eliminar sección</DialogTitle>
              <DialogDescription>¿Seguro que quieres eliminar esta sección? Esta acción no se puede deshacer.</DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={() => setEditorDeleteOpen(false)}>Cancelar</Button>
              <Button variant="destructive" onClick={() => { setEditorDeleteOpen(false); deleteSection(selectedSection.id); }}>Eliminar</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    );
  };

  return (
    <div className="builder-sidebar">
      <Tabs defaultValue={activeTab} onValueChange={(val) => setActiveTab(val as any)}>
        <TabsList className="w-full justify-start">
          <TabsTrigger value="sections" className="flex items-center gap-2">
            <Boxes className="h-4 w-4" />
            Secciones
          </TabsTrigger>
          <TabsTrigger value="layers" className="flex items-center gap-2">
            <LayersIcon className="h-4 w-4" />
            Capas
          </TabsTrigger>
          <TabsTrigger value="settings" className="flex items-center gap-2">
            <SettingsIcon className="h-4 w-4" />
            Configuración
          </TabsTrigger>
        </TabsList>

        <TabsContent value="sections">
          {!selectedSection ? (
            <div className="section-library">
              <h3>Agregar Sección</h3>
              <div className="section-list">
                {sections.map((section) => (
                  <Card key={section.type} className="mb-2 cursor-pointer" onClick={() => handleAddSection(section.type)}>
                    <CardHeader className="py-3">
                      <CardTitle className="text-sm flex items-center gap-2">
                        {/* Map section.type to lucide icon for consistency */}
                        {section.type === 'hero' && <Boxes className="h-4 w-4" />}
                        {section.type === 'pricing' && <BadgePercent className="h-4 w-4" />}
                        {section.type === 'gallery' && <Images className="h-4 w-4" />}
                        {section.type === 'about' && <Info className="h-4 w-4" />}
                        {section.type === 'schedule' && <CalendarDays className="h-4 w-4" />}
                        {section.type === 'contact' && <Phone className="h-4 w-4" />}
                        {section.name}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0 text-sm text-muted-foreground">
                      {section.description}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ) : (
            renderSectionEditor()
          )}
        </TabsContent>

        <TabsContent value="layers">
          <div className="layers-panel">
            <h3>Capas de Secciones</h3>
            {page && page.sections.length > 0 ? (
              <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                <SortableContext items={page.sections.map(s => s.id)} strategy={verticalListSortingStrategy}>
                  <div className="layers-list">
                    {page.sections.map((section, index) => (
                      <SortableLayerItem
                        key={section.id}
                        section={section}
                        index={index}
                        onSelect={selectSection}
                        onDelete={deleteSection}
                        isSelected={section.id === selectedSectionId}
                      />
                    ))}
                  </div>
                </SortableContext>
              </DndContext>
            ) : (
              <div className="empty-layers">
                <p>No hay secciones en la página</p>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="settings">
          <div className="page-settings">
            <h3>Configuración de Página</h3>
            {page && (
              <div className="settings-fields">
                <div className="editor-field">
                  <label>Título</label>
                  <Input
                    value={page.metadata.title}
                    onChange={(e) => {
                      updateSection(page.id, {
                        data: { ...page.metadata, title: e.target.value }
                      } as any);
                    }}
                  />
                </div>
                <p className="settings-note">Más opciones de configuración próximamente...</p>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BuilderSidebar;
