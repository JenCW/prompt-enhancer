const { useState } = React;
const { Copy, Check, Zap, Sparkles } = window.lucide;

const PromptEnhancer = () => {
  const [task, setTask] = useState('');
  const [context, setContext] = useState('');
  const [enhancedPrompt, setEnhancedPrompt] = useState('');
  const [copied, setCopied] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState('');

  const templates = {
    'Website Design': {
      task: 'Design a high-converting landing page',
      context: 'For a solopreneur service business targeting overwhelmed small business owners'
    },
    'Email Campaign': {
      task: 'Write a email nurture sequence',
      context: 'To convert leads into clients for an automation service'
    },
    'Competitor Analysis': {
      task: 'Analyze competitor positioning and messaging',
      context: 'For agencies in the branding and automation space'
    },
    'Content Strategy': {
      task: 'Create a 30-day content calendar',
      context: 'For social media targeting entrepreneurs who hate marketing busywork'
    },
    'Brand Messaging': {
      task: 'Develop core brand messaging and value proposition',
      context: 'For a premium automation service that eliminates marketing tasks'
    },
    'Brand Guidelines': {
      task: 'Create comprehensive brand guidelines document',
      context: 'Complete visual identity system with logo usage, colors, typography, and brand standards'
    }
  };

  const generatePrompt = () => {
    const basePrompt = `I need you to ${task}${context ? ` for ${context}` : ''}.

Before you give me your final answer, I want you to:

1. **First, define what world-class looks like:** What would a top 1% expert with 20+ years of experience consider the hallmarks of excellence for this specific type of project? What separates good from exceptional? Be specific about principles, best practices, and what makes something truly outstanding.

2. **Create an internal rubric:** Based on that world-class standard, create a scoring rubric with 5-7 key criteria that matter most for this project. Include what "outstanding" looks like for each criterion.

3. **Generate your initial solution:** Create your first version.

4. **Self-evaluate against the rubric:** Score your initial solution honestly against each criterion. Identify gaps, weaknesses, and missed opportunities.

5. **Identify blind spots:** What assumptions did you make? What did you not consider? What constraints, edge cases, or scenarios might you have overlooked? What would a harsh critic point out?

6. **Iterate:** Based on your evaluation and identified blind spots, create an improved version that addresses the gaps.

7. **Final check:** Does this new version actually solve the original problem better? Is there anything you'd still improve?

**Then show me:** The world-class definition, your rubric, your self-evaluation, the blind spots you found, and your final iterated solution with explanation of what makes it superior.`;

    setEnhancedPrompt(basePrompt);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(enhancedPrompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const loadTemplate = (templateName) => {
    if (templateName) {
      setTask(templates[templateName].task);
      setContext(templates[templateName].context);
      setSelectedTemplate(templateName);
    } else {
      setTask('');
      setContext('');
      setSelectedTemplate('');
    }
    setEnhancedPrompt('');
  };

  return React.createElement('div', { className: "min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6" },
    React.createElement('div', { className: "max-w-4xl mx-auto" },
      // Header
      React.createElement('div', { className: "text-center mb-8" },
        React.createElement('div', { className: "flex items-center justify-center gap-2 mb-3" },
          React.createElement(Sparkles, { className: "w-8 h-8 text-cyan-400" }),
          React.createElement('h1', { className: "text-4xl font-bold text-white" }, 'Prompt Enhancer')
        ),
        React.createElement('p', { className: "text-slate-300 text-lg" }, 'Get world-class AI outputs, every single time'),
        React.createElement('p', { className: "text-slate-400 text-sm mt-1" }, 'by Branded + Flow')
      ),

      // Template Selector
      React.createElement('div', { className: "bg-slate-800/50 backdrop-blur rounded-lg p-6 mb-6 border border-slate-700" },
        React.createElement('label', { className: "block text-sm font-medium text-slate-300 mb-2" }, 'Quick Start Templates'),
        React.createElement('select', {
          value: selectedTemplate,
          onChange: (e) => loadTemplate(e.target.value),
          className: "w-full bg-slate-900 border border-slate-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
        },
          React.createElement('option', { value: "" }, 'Start from scratch'),
          ...Object.keys(templates).map((name) =>
            React.createElement('option', { key: name, value: name }, name)
          )
        )
      ),

      // Input Form
      React.createElement('div', { className: "bg-slate-800/50 backdrop-blur rounded-lg p-6 mb-6 border border-slate-700" },
        React.createElement('div', { className: "mb-4" },
          React.createElement('label', { className: "block text-sm font-medium text-slate-300 mb-2" }, 'What do you want to create? *'),
          React.createElement('input', {
            type: "text",
            value: task,
            onChange: (e) => setTask(e.target.value),
            placeholder: "e.g., Design a website homepage, Write email copy, Create a content strategy...",
            className: "w-full bg-slate-900 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
          })
        ),
        React.createElement('div', { className: "mb-4" },
          React.createElement('label', { className: "block text-sm font-medium text-slate-300 mb-2" }, 'Context (optional but recommended)'),
          React.createElement('textarea', {
            value: context,
            onChange: (e) => setContext(e.target.value),
            placeholder: "Who's it for? What's the goal? Any specific requirements or constraints?",
            rows: 3,
            className: "w-full bg-slate-900 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 resize-none"
          })
        ),
        React.createElement('button', {
          onClick: generatePrompt,
          disabled: !task.trim(),
          className: "w-full bg-gradient
            className: "w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 disabled:from-slate-600 disabled:to-slate-600 disabled:cursor-not-allowed text-white font-medium py-3 px-6 rounded-lg transition-all duration-200 flex items-center justify-center gap-2"
        },
          React.createElement(Zap, { className: "w-5 h-5" }),
          'Generate World-Class Prompt'
        )
      ),

      // Enhanced Prompt Output
      enhancedPrompt && React.createElement('div', { className: "bg-slate-800/50 backdrop-blur rounded-lg p-6 border border-slate-700" },
        React.createElement('div', { className: "flex items-center justify-between mb-4" },
          React.createElement('h2', { className: "text-xl font-semibold text-white" }, 'Your Enhanced Prompt'),
          React.createElement('button', {
            onClick: copyToClipboard,
            className: "flex items-center gap-2 bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-lg transition-colors duration-200"
          },
            copied ? [
              React.createElement(Check, { key: "icon", className: "w-4 h-4" }),
              'Copied!'
            ] : [
              React.createElement(Copy, { key: "icon", className: "w-4 h-4" }),
              'Copy'
            ]
          )
        ),
        React.createElement('div', { className: "bg-slate-900 rounded-lg p-4 border border-slate-700" },
          React.createElement('pre', { className: "text-slate-200 text-sm whitespace-pre-wrap font-mono overflow-x-auto" },
            enhancedPrompt
          )
        ),
        React.createElement('div', { className: "mt-4 p-4 bg-cyan-900/20 border border-cyan-700/50 rounded-lg" },
          React.createElement('p', { className: "text-cyan-300 text-sm" },
            React.createElement('strong', null, 'Next step: '),
            'Copy this prompt and paste it into a new chat with Claude (or your AI of choice). The AI will work through each step systematically to deliver exceptional results.'
          )
        )
      ),

      // How It Works
      !enhancedPrompt && React.createElement('div', { className: "bg-slate-800/30 backdrop-blur rounded-lg p-6 border border-slate-700/50" },
        React.createElement('h3', { className: "text-lg font-semibold text-white mb-3" }, 'How It Works'),
        React.createElement('div', { className: "space-y-2 text-slate-300 text-sm" },
          React.createElement('p', null, '✓ Forces AI to define world-class standards before creating anything'),
          React.createElement('p', null, '✓ Creates an internal rubric to self-evaluate quality'),
          React.createElement('p', null, '✓ Identifies blind spots and assumptions it might have missed'),
          React.createElement('p', null, '✓ Iterates to create a superior final solution'),
          React.createElement('p', null, '✓ Shows you the entire thinking process, not just the output')
        )
      )
    )
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(React.createElement(PromptEnhancer));
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Prompt Enhancer - Branded + Flow</title>
    <script crossorigin src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
    <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://unpkg.com/lucide@latest"></script>
</head>
<body>
    <div id="root"></div>
    <script type="text/babel" src="app.js"></script>
    <script>
      lucide.createIcons();
    </script>
</body>
</html>
