import React from 'react';
import type { Resource } from '../../data/resources';
import { useAppContext } from '../../contexts/AppContext';

interface ResourceDetailModalProps {
    resource: Resource;
    onClose: () => void;
}

const ResourceDetailModal: React.FC<ResourceDetailModalProps> = ({ resource, onClose }) => {
    const { t } = useAppContext();

    return (
        <div 
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in p-4"
            onClick={onClose}
        >
            <div 
                className="bg-white dark:bg-dark-bg-card rounded-2xl shadow-xl w-full max-w-lg m-4 overflow-hidden animate-slide-up"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="h-48 md:h-64 bg-gray-200 dark:bg-gray-700">
                     <img src={resource.imageUrl} alt={t(resource.titleKey)} className="w-full h-full object-cover" />
                </div>
                <div className="p-6">
                    <p className="text-sm font-bold uppercase text-primary-teal">{resource.type}</p>
                    <h2 className="text-2xl font-headings font-bold mt-1 text-gray-800 dark:text-gray-100">{t(resource.titleKey)}</h2>
                    <p className="text-gray-600 dark:text-gray-300 mt-2 max-h-32 overflow-y-auto">
                        {t(resource.descriptionKey)}
                    </p>
                    
                    <a
                        href={resource.contentUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block w-full text-center px-6 py-3 mt-6 font-bold text-white rounded-full bg-primary-teal hover:bg-teal-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-teal transition-all transform hover:scale-105"
                    >
                        {t('resource_modal_open')}
                    </a>
                </div>
                 <button onClick={onClose} className="absolute top-2 right-2 p-2 rounded-full bg-black/20 text-white hover:bg-black/40 transition-colors">
                     <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default ResourceDetailModal;
