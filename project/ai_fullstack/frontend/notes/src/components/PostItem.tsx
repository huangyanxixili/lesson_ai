import * as React from 'react';
import {
    useNavigate       
} from "react-router-dom";
import type { Post } from '@/types/index';
import { Badge } from '@/components/ui/badge';

interface PostItemProps {
    post: Post
}

const PostItem: React.FC<PostItemProps> = ({post}) => {
    const navigate = useNavigate();
    return (
        <div 
            className="flex border-b border-border py-4 py-2"
            // 动态路由 暴露资源restful url资源具有描述性
            onClick={() => { navigate(`/post/${post.id}`) }}
        >
            <div className="flex-1 pr-4 space-y-2">
                <div className="flex items-center gap-2">
                    {
                        post.tags.map((tag, index) => (
                            <Badge 
                                key={index} 
                                variant="outline"
                                className="text-xs"
                            >
                                {tag.tag.name}
                            </Badge>
                        ))
                    }
                </div>
                {/* line-clamp-2 列表里面行高的截取 */}
                <h2 className="text-base font-semibold leading-tight line-clamp-2">
                    {post.title}
                </h2>
            </div>
        </div>
    )
}

export default PostItem;
