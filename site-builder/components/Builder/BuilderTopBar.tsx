import React from 'react';
import { useBuilder } from '../../context/BuilderContext';
import { JsonParser } from '../../utils';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Pencil, Eye, FileJson, FileCode, Save as SaveIcon, Rocket } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import './BuilderTopBar.css';

interface BuilderTopBarProps {
  onSave?: (page: any) => void;
  onPublish?: (page: any) => void;
}

const BuilderTopBar: React.FC<BuilderTopBarProps> = ({ onSave, onPublish }) => {
  const { state, setPreviewMode } = useBuilder();
  const { page, isDirty, previewMode } = state;

  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [dialogTitle, setDialogTitle] = React.useState<string>('');
  const [dialogDescription, setDialogDescription] = React.useState<string>('');

  const handleSave = () => {
    if (page && onSave) {
      onSave(page);
      // Save to localStorage as backup
      localStorage.setItem(`site-builder-${page.id}`, JSON.stringify(page));
      setDialogTitle('Página guardada');
      setDialogDescription('La página se guardó exitosamente.');
      setDialogOpen(true);
    }
  };

  const handlePublish = () => {
    if (page && onPublish) {
      onPublish(page);
      setDialogTitle('Página publicada');
      setDialogDescription('La página fue publicada exitosamente.');
      setDialogOpen(true);
    }
  };

  const handleExportJSON = () => {
    if (!page) return;
    const json = JsonParser.exportPageConfig(page);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${page.id}-config.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleExportHTML = () => {
    if (!page) return;
    const html = JsonParser.exportToHTML(page);
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${page.id}.html`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="builder-topbar">
      <div className="topbar-left">
        <h1 className="builder-title">Site Builder</h1>
        {page && <span className="page-name">{page.name}</span>}
      </div>

      <div className="topbar-center">
        <Tabs
          defaultValue={previewMode ? 'preview' : 'edit'}
          onValueChange={(val) => setPreviewMode(val === 'preview')}
        >
          <TabsList>
            <TabsTrigger value="edit" className="flex items-center gap-2">
              <Pencil className="h-4 w-4" />
              Editar
            </TabsTrigger>
            <TabsTrigger value="preview" className="flex items-center gap-2">
              <Eye className="h-4 w-4" />
              Vista Previa
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="topbar-right">
        <div className="button-group">
          <Button variant="secondary" onClick={handleExportJSON} disabled={!page} title="Exportar JSON" className="flex items-center gap-2">
            <FileJson className="h-4 w-4" />
            JSON
          </Button>
          <Button variant="secondary" onClick={handleExportHTML} disabled={!page} title="Exportar HTML" className="flex items-center gap-2">
            <FileCode className="h-4 w-4" />
            HTML
          </Button>
        </div>

        <Button onClick={handleSave} disabled={!page || !isDirty} className="flex items-center gap-2">
          <SaveIcon className="h-4 w-4" />
          Guardar {isDirty && '*'}
        </Button>

        <Button className="bg-green-600 hover:bg-green-700 flex items-center gap-2" onClick={handlePublish} disabled={!page}>
          <Rocket className="h-4 w-4" />
          Publicar
        </Button>
      </div>

      {/* Success dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{dialogTitle}</DialogTitle>
            <DialogDescription>{dialogDescription}</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={() => setDialogOpen(false)}>Cerrar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BuilderTopBar;
