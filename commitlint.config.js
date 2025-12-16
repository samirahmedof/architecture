export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    // 1. TYPE QAYDALARI 🏷️
    // Yalnız bu sözlərlə başlaya bilər. Başqa söz (məs: update, add) QADAĞANDIR.
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
};
