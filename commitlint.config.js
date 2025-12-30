export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2, // Error (Səhv qaytar)
      'always',
      [
        'feat', // Yeni funksionallıq
        'fix', // Bug təmiri
        'perf', // Performans yaxşılaşdırması

        'docs', // Sənədləşdirmə (README, TSDoc)
        'style', // Formatlama (boşluq, nöqtə-vergül - kod dəyişmir)
        'test', // Test əlavə etmək
        'chore', // Digər xırda işlər (deps update)
      ],
    ],

    'scope-case': [2, 'always', 'kebab-case'],
    'subject-empty': [2, 'never'],
    'subject-full-stop': [2, 'never', '.'],
    'subject-case': [2, 'never', ['sentence-case', 'start-case', 'pascal-case', 'upper-case']],
    'header-max-length': [2, 'always', 100],
  },
  prompt: {
    skipQuestions: ['body', 'breaking', 'footerPrefix', 'footer'],
    types: [
      { value: 'feat', name: 'feat:     ✨  A new feature' },
      { value: 'fix', name: 'fix:      🐛  A bug fix' },
      { value: 'perf', name: 'perf:     ⚡️  A code change that improves performance' },

      { value: 'docs', name: 'docs:     📝  Documentation only changes' },
      { value: 'style', name: 'style:    💄  White-space, formatting, missing semi-colons, etc' },
      { value: 'chore', name: "chore:    🔨  Other changes that don't modify src or test files" },
      { value: 'test', name: 'test:     ✅  Adding missing tests or correcting existing tests' },
    ],

    // Mesajları qısa və konkret edək
    messages: {
      type: 'Select the type of change:',
      scope: 'Denote the SCOPE of this change (optional):',
      subject: 'Write a SHORT, IMPERATIVE tense description of the change:\n',
      confirmCommit: 'Are you sure you want to proceed with the commit above?',
    },

    // Təqdimat stilini sadələşdir
    allowCustomScopes: true,
    allowEmptyScopes: true,
    upperCaseSubject: false,
    markBreakingChangeMode: false,
    // allowBreakingChanges: ['feat', 'fix'],
  },
};
