import React, { useState } from 'react';
import { Template } from '../../types';
import basicEventTemplate from '../../data/templates/basic-event.json';
import conferenceTemplate from '../../data/templates/conference.json';
import concertTemplate from '../../data/templates/concert.json';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { X, FileText } from 'lucide-react';
import './TemplateGallery.css';

interface TemplateGalleryProps {
  onSelectTemplate: (template: Template) => void;
  onClose: () => void;
}

const templates: Template[] = [
  basicEventTemplate as Template,
  conferenceTemplate as Template,
  concertTemplate as Template
];

const TemplateGallery: React.FC<TemplateGalleryProps> = ({
  onSelectTemplate,
  onClose
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', name: 'Todos' },
    { id: 'event', name: 'Eventos' },
    { id: 'conference', name: 'Conferencias' },
    { id: 'concert', name: 'Conciertos' }
  ];

  const filteredTemplates = selectedCategory === 'all'
    ? templates
    : templates.filter(t => t.category === selectedCategory);

  return (
    <div className="template-gallery-overlay">
      <div className="template-gallery">
        <div className="template-gallery-header">
          <h2>Elige una Plantilla</h2>
          <Button variant="ghost" className="close-button" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        <Tabs defaultValue={selectedCategory} onValueChange={(val) => setSelectedCategory(val)}>
          <TabsList className="template-categories">
            {categories.map(cat => (
              <TabsTrigger key={cat.id} value={cat.id}>{cat.name}</TabsTrigger>
            ))}
          </TabsList>

          {categories.map(cat => (
            <TabsContent key={cat.id} value={cat.id}>
              <div className="template-grid">
                {(cat.id === 'all' ? templates : templates.filter(t => t.category === cat.id)).map(template => (
                  <Card key={template.id} className="template-card">
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        {template.name}
                        <Badge variant="secondary">{template.category}</Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="template-preview">
                        <div className="template-preview-placeholder">
                          <span className="template-icon">
                            <FileText className="h-5 w-5" />
                          </span>
                          <p>{template.name}</p>
                        </div>
                      </div>
                      <p className="mt-2 text-sm text-muted-foreground">{template.description}</p>
                      <div className="template-meta">
                        <span className="template-sections">{template.sections.length} secciones</span>
                      </div>
                      <Button className="mt-3" onClick={() => onSelectTemplate(template)}>
                        Usar Plantilla
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>

        <div className="template-gallery-footer">
          <Button variant="outline" onClick={() => {
            const blankTemplate: Template = {
              id: 'blank',
              name: 'Plantilla en Blanco',
              description: 'Comienza desde cero',
              category: 'custom',
              metadata: {
                title: 'Nueva Página',
                theme: 'light',
                primaryColor: '#ff6b6b',
                secondaryColor: '#4ecdc4'
              },
              sections: [],
              defaultData: {}
            };
            onSelectTemplate(blankTemplate);
          }}>
            Comenzar desde Cero
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TemplateGallery;
