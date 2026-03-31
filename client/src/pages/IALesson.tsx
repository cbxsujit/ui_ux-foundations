import React, { useState } from 'react';
import { LessonLayout } from '../components/LessonLayout';
import { Network, ChevronRight, ChevronDown, Folder, FileText, Home } from 'lucide-react';

interface TreeNode {
  id: string;
  label: string;
  type: 'folder' | 'file' | 'home';
  children?: TreeNode[];
}

const sitemapData: TreeNode = {
  id: 'home',
  label: 'Home',
  type: 'home',
  children: [
    {
      id: 'products',
      label: 'Products',
      type: 'folder',
      children: [
        { id: 'shoes', label: 'Shoes', type: 'file' },
        { id: 'clothing', label: 'Clothing', type: 'file' },
        { id: 'accessories', label: 'Accessories', type: 'file' },
      ]
    },
    {
      id: 'about',
      label: 'About Us',
      type: 'folder',
      children: [
        { id: 'story', label: 'Our Story', type: 'file' },
        { id: 'team', label: 'Team', type: 'file' },
        { id: 'careers', label: 'Careers', type: 'file' },
      ]
    },
    {
      id: 'support',
      label: 'Support',
      type: 'folder',
      children: [
        { id: 'faq', label: 'FAQ', type: 'file' },
        { id: 'contact', label: 'Contact Us', type: 'file' },
      ]
    }
  ]
};

export function IALesson() {
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set(['home', 'products']));
  const [selectedNode, setSelectedNode] = useState<string>('home');
  const [breadcrumbs, setBreadcrumbs] = useState<string[]>(['Home']);

  const toggleNode = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const newExpanded = new Set(expandedNodes);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedNodes(newExpanded);
  };

  const selectNode = (node: TreeNode, path: string[]) => {
    setSelectedNode(node.id);
    setBreadcrumbs([...path, node.label]);
  };

  const renderTree = (node: TreeNode, path: string[] = []) => {
    const isExpanded = expandedNodes.has(node.id);
    const isSelected = selectedNode === node.id;
    const hasChildren = node.children && node.children.length > 0;

    return (
      <div key={node.id} className="ml-4">
        <div 
          className={`flex items-center gap-2 py-1.5 px-2 rounded-lg cursor-pointer transition-colors ${
            isSelected ? 'bg-indigo-50 text-indigo-700' : 'hover:bg-gray-100 text-gray-700'
          }`}
          onClick={() => selectNode(node, path)}
        >
          {hasChildren ? (
            <button 
              onClick={(e) => toggleNode(node.id, e)}
              className="p-0.5 hover:bg-gray-200 rounded text-gray-500"
            >
              {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
            </button>
          ) : (
            <div className="w-5" /> // Spacer for alignment
          )}
          
          {node.type === 'home' && <Home className={`w-4 h-4 ${isSelected ? 'text-indigo-600' : 'text-gray-500'}`} />}
          {node.type === 'folder' && <Folder className={`w-4 h-4 ${isSelected ? 'text-indigo-600' : 'text-gray-500'}`} />}
          {node.type === 'file' && <FileText className={`w-4 h-4 ${isSelected ? 'text-indigo-600' : 'text-gray-500'}`} />}
          
          <span className={`text-sm ${isSelected ? 'font-medium' : ''}`}>{node.label}</span>
        </div>

        {hasChildren && isExpanded && (
          <div className="border-l border-gray-200 ml-2.5 pl-1 mt-1">
            {node.children!.map(child => renderTree(child, [...path, node.label]))}
          </div>
        )}
      </div>
    );
  };

  const theory = (
    <div className="space-y-6 text-gray-600">
      <p>
        <strong>Information Architecture (IA)</strong> focuses on organizing, structuring, and labeling content in an effective and sustainable way. The goal is to help users find information and complete tasks.
      </p>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Core Components</h3>
        <ul className="list-disc pl-5 space-y-2">
          <li><strong>Ontology:</strong> The specific meaning of the content (labels and tags).</li>
          <li><strong>Taxonomy:</strong> How the information is grouped, classified, and arranged.</li>
          <li><strong>Choreography:</strong> The rules for how users interact with and move through the information.</li>
        </ul>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Sitemaps</h3>
        <p>
          A sitemap is a visual representation of the relationship between different pages on a website. It shows the hierarchy and navigation structure, ensuring that content is logically grouped and easily accessible.
        </p>
      </div>
    </div>
  );

  const playground = (
    <div className="flex flex-col h-full bg-gray-50">
      <div className="p-4 border-b border-gray-200 bg-white flex items-center gap-2">
        <Network className="w-5 h-5 text-indigo-600" />
        <h3 className="font-semibold text-gray-900">Interactive Sitemap</h3>
      </div>

      <div className="flex-1 p-6 flex flex-col md:flex-row gap-6 overflow-hidden">
        {/* Left: Tree View */}
        <div className="flex-1 bg-white rounded-xl border border-gray-200 p-4 overflow-y-auto shadow-sm">
          <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Site Structure</h4>
          <div className="-ml-4">
            {renderTree(sitemapData)}
          </div>
        </div>

        {/* Right: Details / Breadcrumbs */}
        <div className="flex-1 flex flex-col gap-4">
          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Current Path (Breadcrumbs)</h4>
            <div className="flex flex-wrap items-center gap-2 text-sm">
              {breadcrumbs.map((crumb, index) => (
                <React.Fragment key={index}>
                  <span className={index === breadcrumbs.length - 1 ? 'font-semibold text-indigo-600' : 'text-gray-600'}>
                    {crumb}
                  </span>
                  {index < breadcrumbs.length - 1 && (
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          <div className="bg-indigo-50 rounded-xl border border-indigo-100 p-6 flex-1">
            <h4 className="text-sm font-semibold text-indigo-900 mb-2">Why this matters</h4>
            <p className="text-sm text-indigo-800/80 leading-relaxed">
              Clear Information Architecture ensures that users always know where they are, what they're looking at, and how to get to where they want to go. Breadcrumbs (shown above) are a direct UI reflection of your underlying IA.
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <LessonLayout
      title="Information Architecture"
      description="Organize content so users can easily find what they need."
      theory={theory}
      playground={playground}
    />
  );
}
