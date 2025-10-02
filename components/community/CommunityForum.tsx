import React from 'react';
import { COMMUNITY_POSTS_DATA, CommunityPost } from '../../data/community';
import { useAppContext } from '../../contexts/AppContext';

const HeartIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
    </svg>
);

const CommentIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z" clipRule="evenodd" />
    </svg>
);

const PostCard: React.FC<{ post: CommunityPost }> = ({ post }) => {
    const { t } = useAppContext();
    return (
        <div className="bg-white dark:bg-dark-bg-card rounded-2xl shadow-md p-5 transition-transform transform hover:-translate-y-1 animate-slide-up">
            <span className="text-xs font-bold uppercase text-secondary-coral">{t(post.categoryKey)}</span>
            <h3 className="font-headings font-bold text-gray-800 dark:text-gray-100 mt-2 text-lg">{t(post.titleKey)}</h3>
            <p className="text-gray-600 dark:text-gray-300 mt-2 text-sm">{t(post.contentSnippetKey)}</p>
            <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                <p className="text-xs font-bold text-gray-500 dark:text-gray-400">by {post.authorName}</p>
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                    <span className="flex items-center mr-4"><HeartIcon /> {post.likes}</span>
                    <span className="flex items-center"><CommentIcon /> {post.comments}</span>
                </div>
            </div>
        </div>
    );
};

const CommunityForum: React.FC = () => {
    const { t } = useAppContext();

    return (
        <div className="p-4 space-y-4">
            <div className="flex items-center justify-between px-2">
                <h2 className="text-lg font-headings font-bold text-gray-800 dark:text-gray-100">{t('help_center_tab_community')}</h2>
                <button className="px-4 py-2 text-sm font-bold text-white bg-primary-teal rounded-full hover:bg-teal-500 transition-colors">
                    {t('community_share_victory_button')}
                </button>
            </div>
             {COMMUNITY_POSTS_DATA.map((post, index) => (
                <div key={post.id} style={{ animationDelay: `${index * 100}ms` }}>
                    <PostCard post={post} />
                </div>
            ))}
        </div>
    );
};

export default CommunityForum;