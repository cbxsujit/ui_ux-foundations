import React, { useState, createContext, useEffect } from 'react';
import { Layout } from './components/Layout';
import { LessonId } from './types';

export const NavigationContext = createContext<{
  activeLesson: LessonId;
  setActiveLesson: (id: LessonId) => void;
  markLessonCompleted: (id: LessonId) => void;
  completedLessons: Set<LessonId>;
  isLoading: boolean;
}>({
  activeLesson: 'intro',
  setActiveLesson: () => {},
  markLessonCompleted: () => {},
  completedLessons: new Set(),
  isLoading: false,
});
import { IntroLesson } from './pages/IntroLesson';
import { ColorLesson } from './pages/ColorLesson';
import { TypographyLesson } from './pages/TypographyLesson';
import { SpacingLesson } from './pages/SpacingLesson';
import { HierarchyLesson } from './pages/HierarchyLesson';
import { NavigationLesson } from './pages/NavigationLesson';
import { OverlaysLesson } from './pages/OverlaysLesson';
import { StatesLesson } from './pages/StatesLesson';
import { FormsLesson } from './pages/FormsLesson';
import { FeedbackLesson } from './pages/FeedbackLesson';
import { CardsLesson } from './pages/CardsLesson';
import { ProgressLesson } from './pages/ProgressLesson';
import { TooltipsLesson } from './pages/TooltipsLesson';
import { PsychologyLesson } from './pages/PsychologyLesson';
import { ResearchLesson } from './pages/ResearchLesson';
import { PersonasLesson } from './pages/PersonasLesson';
import { IALesson } from './pages/IALesson';
import { FlowsLesson } from './pages/FlowsLesson';
import { ResponsiveLesson } from './pages/ResponsiveLesson';
import { DesignStylesLesson } from './pages/DesignStylesLesson';
import { MicrointeractionsLesson } from './pages/MicrointeractionsLesson';
import { AnimationsLesson } from './pages/AnimationsLesson';
import { OnboardingLesson } from './pages/OnboardingLesson';
import { EmptyStatesLesson } from './pages/EmptyStatesLesson';
import { AccessibilityLesson } from './pages/AccessibilityLesson';
import { TestingLesson } from './pages/TestingLesson';
import { MetricsLesson } from './pages/MetricsLesson';
import { SystemsLesson } from './pages/SystemsLesson';
import { DataVizLesson } from './pages/DataVizLesson';
import { SearchFilterLesson } from './pages/SearchFilterLesson';
import { DataHandlingLesson } from './pages/DataHandlingLesson';
import { GuidedProcessesLesson } from './pages/GuidedProcessesLesson';
import { PerformanceUXLesson } from './pages/PerformanceUXLesson';
import { MobileUXLesson } from './pages/MobileUXLesson';
import { ThemingLesson } from './pages/ThemingLesson';
import { TabsLesson } from './pages/TabsLesson';
import { CarouselLesson } from './pages/CarouselLesson';
import { BentoGridLesson } from './pages/BentoGridLesson';
import { AccordionLesson } from './pages/AccordionLesson';
import { BreadcrumbsLesson } from './pages/BreadcrumbsLesson';
import { RadioButtonsLesson } from './pages/RadioButtonsLesson';
import { ToastLesson } from './pages/ToastLesson';
import { SnackbarLesson } from './pages/SnackbarLesson';
import { AnnotatedMockupLesson } from './pages/AnnotatedMockupLesson';
import { AIUXLesson } from './pages/AIUXLesson';
import { SpatialDesignLesson } from './pages/SpatialDesignLesson';
import { VoiceUILesson } from './pages/VoiceUILesson';
import { EthicalDesignLesson } from './pages/EthicalDesignLesson';
import { PrivacySecurityLesson } from './pages/PrivacySecurityLesson';
import { LocalizationLesson } from './pages/LocalizationLesson';
import { GamificationLesson } from './pages/GamificationLesson';
import { HabitLoopsLesson } from './pages/HabitLoopsLesson';
import { PushNotificationsLesson } from './pages/PushNotificationsLesson';

import { Toast } from './components/Toast';

export default function App() {
  const [activeLesson, setActiveLesson] = useState<LessonId>('intro');
  const [isLoading, setIsLoading] = useState(false);
  const [completedLessons, setCompletedLessons] = useState<Set<LessonId>>(new Set());
  const [toastMessage, setToastMessage] = useState('');
  const [isToastVisible, setIsToastVisible] = useState(false);

  useEffect(() => {
    // Load progress from API
    fetch('/api/progress')
      .then(res => res.json())
      .then(data => {
        const completed = new Set(data.filter((r: any) => r.completed).map((r: any) => r.lesson_id));
        setCompletedLessons(completed);
      })
      .catch(err => console.error('Failed to load progress:', err));
  }, []);

  const handleLessonChange = (id: LessonId) => {
    if (id === activeLesson) return;
    setIsLoading(true);
    setActiveLesson(id);
    
    // Save progress (mark current as accessed/started)
    fetch('/api/progress', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ lessonId: id, completed: completedLessons.has(id) })
    }).catch(err => console.error('Failed to save progress:', err));

    setTimeout(() => {
      setIsLoading(false);
    }, 400); // Simulate network/render delay
  };

  const markLessonCompleted = (id: LessonId) => {
    if (!completedLessons.has(id)) {
      const newCompleted = new Set(completedLessons);
      newCompleted.add(id);
      setCompletedLessons(newCompleted);

      setToastMessage('Lesson completed! Great job 🎉');
      setIsToastVisible(true);

      fetch('/api/progress', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ lessonId: id, completed: true })
      }).catch(err => console.error('Failed to save progress:', err));
    }
  };

  const renderLesson = () => {
    switch (activeLesson) {
      case 'intro':
        return <IntroLesson onNext={() => handleLessonChange('psychology')} />;
      case 'color':
        return <ColorLesson />;
      case 'typography':
        return <TypographyLesson />;
      case 'spacing':
        return <SpacingLesson />;
      case 'hierarchy':
        return <HierarchyLesson />;
      case 'navigation':
        return <NavigationLesson />;
      case 'overlays':
        return <OverlaysLesson />;
      case 'states':
        return <StatesLesson />;
      case 'forms':
        return <FormsLesson />;
      case 'feedback':
        return <FeedbackLesson />;
      case 'cards':
        return <CardsLesson />;
      case 'progress':
        return <ProgressLesson />;
      case 'tooltips':
        return <TooltipsLesson />;
      case 'psychology':
        return <PsychologyLesson />;
      case 'research':
        return <ResearchLesson />;
      case 'personas':
        return <PersonasLesson />;
      case 'ia':
        return <IALesson />;
      case 'flows':
        return <FlowsLesson />;
      case 'responsive':
        return <ResponsiveLesson />;
      case 'design_styles':
        return <DesignStylesLesson />;
      case 'microinteractions':
        return <MicrointeractionsLesson />;
      case 'animations':
        return <AnimationsLesson />;
      case 'onboarding':
        return <OnboardingLesson />;
      case 'empty_states':
        return <EmptyStatesLesson />;
      case 'accessibility':
        return <AccessibilityLesson />;
      case 'testing':
        return <TestingLesson />;
      case 'metrics':
        return <MetricsLesson />;
      case 'systems':
        return <SystemsLesson />;
      case 'dataviz':
        return <DataVizLesson />;
      case 'search_filter':
        return <SearchFilterLesson />;
      case 'data_handling':
        return <DataHandlingLesson />;
      case 'guided_processes':
        return <GuidedProcessesLesson />;
      case 'performance_ux':
        return <PerformanceUXLesson />;
      case 'mobile_ux':
        return <MobileUXLesson />;
      case 'theming':
        return <ThemingLesson />;
      case 'tabs':
        return <TabsLesson />;
      case 'carousel':
        return <CarouselLesson />;
      case 'bento_grid':
        return <BentoGridLesson />;
      case 'accordion':
        return <AccordionLesson />;
      case 'breadcrumbs':
        return <BreadcrumbsLesson />;
      case 'radio_buttons':
        return <RadioButtonsLesson />;
      case 'toast':
        return <ToastLesson />;
      case 'snackbar':
        return <SnackbarLesson />;
      case 'annotated_mockup':
        return <AnnotatedMockupLesson />;
      case 'ai_ux':
        return <AIUXLesson />;
      case 'spatial_design':
        return <SpatialDesignLesson />;
      case 'voice_ui':
        return <VoiceUILesson />;
      case 'ethical_design':
        return <EthicalDesignLesson />;
      case 'privacy_security':
        return <PrivacySecurityLesson />;
      case 'localization':
        return <LocalizationLesson />;
      case 'gamification':
        return <GamificationLesson />;
      case 'habit_loops':
        return <HabitLoopsLesson />;
      case 'push_notifications':
        return <PushNotificationsLesson />;
      default:
        return <IntroLesson onNext={() => handleLessonChange('psychology')} />;
    }
  };

  return (
    <NavigationContext.Provider value={{ 
      activeLesson, 
      setActiveLesson: handleLessonChange, 
      markLessonCompleted,
      completedLessons,
      isLoading 
    }}>
      <Layout 
        activeLesson={activeLesson} 
        onSelectLesson={handleLessonChange}
        completedLessons={completedLessons}
      >
        {renderLesson()}
      </Layout>
      <Toast 
        message={toastMessage} 
        isVisible={isToastVisible} 
        onClose={() => setIsToastVisible(false)} 
      />
    </NavigationContext.Provider>
  );
}
