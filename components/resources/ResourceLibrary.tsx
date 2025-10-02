
import React, { useState, useMemo } from 'react';
import { RESOURCES_DATA, Resource, ResourceType } from '../../data/resources';
import { useAppContext } from '../../contexts/AppContext';
import ResourceDetailModal from './ResourceDetailModal';
// FIX: Import TranslationKeys type.
import type { TranslationKeys } from '../../i18n/locales';

const ResourceCard: React.FC<{ resource: Resource; onSelect: () => void }> = ({ resource, onSelect }) => {
    const { t } = useAppContext();
    const typeLabel = resource.type.charAt(0).toUpperCase() + resource.type.slice(1);
    
    return (
        <div 
            className="bg-white dark:bg-dark-bg-card rounded-2xl shadow-md overflow-hidden cursor-pointer group hover:shadow-lg hover:ring-2 hover:ring-primary-teal/50 transition-all animate-slide-up"
            onClick={onSelect}
        >
            <div className="h-40 overflow-hidden">
                <img src={resource.imageUrl} alt={t(resource.titleKey)} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
            </div>
            <div className="p-4">
                <p className="text-xs font-bold uppercase text-primary-teal">{typeLabel}</p>
                <h3 className="font-headings font-bold text-gray-800 dark:text-gray-100 mt-1 truncate">{t(resource.titleKey)}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-1 h-10 overflow-hidden text-ellipsis">{t(resource.descriptionKey)}</p>
            </div>
        </div>
    );
};


type FilterType = 'all' | ResourceType;

const ResourceLibrary: React.FC = () => {
    const { t } = useAppContext();
    const [activeFilter, setActiveFilter] = useState<FilterType>('all');
    const [selectedResource, setSelectedResource] = useState<Resource | null>(null);

    const filters: { id: FilterType; labelKey: TranslationKeys }[] = [
        { id: 'all', labelKey: 'resource_library_all' },
        { id: 'article', labelKey: 'resource_library_articles' },
        { id: 'video', labelKey: 'resource_library_videos' },
        { id: 'podcast', labelKey: 'resource_library_podcasts' },
    ];

    const filteredResources = useMemo(() => {
        if (activeFilter === 'all') {
            return RESOURCES_DATA;
        }
        return RESOURCES_DATA.filter(r => r.type === activeFilter);
    }, [activeFilter]);

    return (
        <div className="p-4">
             {selectedResource && <ResourceDetailModal resource={selectedResource} onClose={() => setSelectedResource(null)} />}
            {/* Filter Tabs */}
            <div className="mb-4 flex items-center space-x-2 overflow-x-auto pb-2">
                {filters.map(filter => (
                    <button
                        key={filter.id}
                        onClick={() => setActiveFilter(filter.id)}
                        className={`px-4 py-2 text-sm font-bold rounded-full transition-colors flex-shrink-0 ${
                            activeFilter === filter.id 
                                ? 'bg-primary-teal text-white' 
                                : 'bg-gray-200/50 dark:bg-gray-700/50 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                        }`}
                    >
                        {t(filter.labelKey)}
                    </button>
                ))}
            </div>

            {/* Resource Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {filteredResources.map((resource, index) => (
                    <div key={resource.id} style={{ animationDelay: `${index * 50}ms`}}>
                        <ResourceCard resource={resource} onSelect={() => setSelectedResource(resource)} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ResourceLibrary;