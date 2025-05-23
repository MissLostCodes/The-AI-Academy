import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, FileText, Video, CheckCircle2 } from "lucide-react";

const MaterialCardItem = ({ material, onGenerate, onView }) => {
    const getIcon = (type) => {
        switch (type) {
            case 'notes':
                return <FileText className="h-5 w-5" />;
            case 'video':
                return <Video className="h-5 w-5" />;
            case 'quiz':
                return <BookOpen className="h-5 w-5" />;
            default:
                return <FileText className="h-5 w-5" />;
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'ready':
                return 'text-green-500';
            case 'generating':
                return 'text-yellow-500';
            case 'failed':
                return 'text-red-500';
            default:
                return 'text-gray-500';
        }
    };

    const getStatusText = (status) => {
        switch (status) {
            case 'ready':
                return 'Ready';
            case 'generating':
                return 'Generating...';
            case 'failed':
                return 'Failed';
            default:
                return 'Not Started';
        }
    };

    return (
        <Card className="w-full transition-all duration-300 hover:shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                    {getIcon(material.type)}
                    {material.title}
                </CardTitle>
                <div className={`text-xs font-medium ${getStatusColor(material.status)}`}>
                    {getStatusText(material.status)}
                </div>
            </CardHeader>
            <CardContent>
                <div className="text-xs text-muted-foreground mb-4">
                    {material.description}
                </div>
                {material.status === 'ready' ? (
                    <Button 
                        variant="outline" 
                        size="sm" 
                        className="w-full hover:bg-primary hover:text-primary-foreground transition-colors"
                        onClick={() => onView(material)}
                    >
                        View
                    </Button>
                ) : material.status === 'generating' ? (
                    <Button 
                        variant="outline" 
                        size="sm" 
                        className="w-full cursor-not-allowed opacity-50"
                        disabled
                    >
                        Generating...
                    </Button>
                ) : (
                    <Button 
                        variant="outline" 
                        size="sm" 
                        className="w-full hover:bg-primary hover:text-primary-foreground transition-colors"
                        onClick={() => onGenerate(material)}
                    >
                        Generate
                    </Button>
                )}
            </CardContent>
        </Card>
    );
};

export default MaterialCardItem; 