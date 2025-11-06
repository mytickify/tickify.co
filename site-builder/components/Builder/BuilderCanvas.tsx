import React from 'react';
import { useBuilder } from '../../context/BuilderContext';
import { PageRenderer } from '../Renderer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import './BuilderCanvas.css';

const BuilderCanvas: React.FC = () => {
  const { state, selectSection } = useBuilder();
  const { page, previewMode } = state;

  if (!page) {
    return (
      <div className="builder-canvas empty">
        <Card>
          <CardHeader>
            <CardTitle>No hay página cargada</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Selecciona una plantilla para comenzar</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (previewMode) {
    return (
      <div className="builder-canvas preview-mode">
        <PageRenderer page={page} isEditable={false} />
      </div>
    );
  }

  return (
    <div className="builder-canvas">
      <div className="canvas-sections">
        {page.sections.length === 0 ? (
          <Card>
            <CardContent>
              <p className="py-6 text-center text-sm text-muted-foreground">Agrega secciones desde el panel lateral</p>
            </CardContent>
          </Card>
        ) : (
          page.sections.map((section) => (
            <Card key={section.id} className="canvas-section" onClick={() => selectSection(section.id)}>
              <CardContent className="pt-6">
                <PageRenderer
                  page={{
                    id: 'temp',
                    name: 'temp',
                    metadata: { title: '' },
                    sections: [section],
                    createdAt: '',
                    updatedAt: ''
                  }}
                  isEditable={true}
                  onSectionEdit={selectSection}
                />
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default BuilderCanvas;
