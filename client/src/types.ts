export type LessonId = 
  // Foundation
  | 'intro' | 'psychology' | 'research' | 'personas' | 'ia' | 'flows'
  // UI Design Principles
  | 'color' | 'typography' | 'spacing' | 'hierarchy' | 'responsive' | 'design_styles'
  // UI Components
  | 'navigation' | 'cards' | 'forms' | 'overlays' | 'tooltips' | 'feedback' | 'progress' | 'tabs' | 'carousel' | 'bento_grid' | 'accordion' | 'breadcrumbs' | 'radio_buttons' | 'toast' | 'snackbar'
  // Interaction Design
  | 'states' | 'microinteractions' | 'animations'
  // Product UX
  | 'onboarding' | 'empty_states' | 'accessibility' | 'testing' | 'metrics'
  // Advanced
  | 'systems' | 'dataviz' | 'search_filter' | 'data_handling' | 'guided_processes' | 'performance_ux' | 'mobile_ux' | 'theming'
  // Emerging Tech & Modern Paradigms
  | 'ai_ux' | 'spatial_design' | 'voice_ui'
  // Ethics, Trust & Global Reach
  | 'ethical_design' | 'privacy_security' | 'localization'
  // Engagement & Retention
  | 'gamification' | 'habit_loops' | 'push_notifications'
  // Final Review
  | 'annotated_mockup';

export interface Lesson {
  id: LessonId;
  title: string;
  description: string;
  icon: string;
  category: string;
}
