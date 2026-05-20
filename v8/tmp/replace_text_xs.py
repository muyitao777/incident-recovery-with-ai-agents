#!/usr/bin/env python3
import os
import re

# List of files to update
files = [
    '/src/app/App.tsx',
    '/src/app/components/AIAgentActivity.tsx',
    '/src/app/components/AIInvestigationSuggestions.tsx',
    '/src/app/components/ImpactMetricsCards.tsx',
    '/src/app/components/ImpactedServicesTable.tsx',
    '/src/app/components/IncidentTimeline.tsx',
    '/src/app/components/InvestigateTabContent.tsx',
    '/src/app/components/InvestigationCanvasExperience.tsx',
    '/src/app/components/InvolvedPeople.tsx',
    '/src/app/components/MetricsCharts.tsx',
    '/src/app/components/QuickRemediation.tsx',
    '/src/app/components/RecoverySummaryContent.tsx',
    '/src/app/components/ServiceDependencyGraph.tsx',
    '/src/app/components/DetailedMetrics.tsx',
    '/src/app/components/LogViewer.tsx',
    '/src/app/components/TraceViewer.tsx',
]

for file_path in files:
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Replace text-xs with text-sm
        updated_content = content.replace('text-xs', 'text-sm')
        
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(updated_content)
        
        print(f"Updated: {file_path}")
    except FileNotFoundError:
        print(f"Skipped (not found): {file_path}")
    except Exception as e:
        print(f"Error with {file_path}: {e}")

print("\nReplacement complete!")
