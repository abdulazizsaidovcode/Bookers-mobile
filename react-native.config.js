module.exports = {
    dependencies: {
      'your-library': {
        platforms: {
          ios: {
            codegenConfig: {
              name: 'YourLibraryName',
              jsSrcsDir: './src',
            },
          },
        },
      },
    },
  };
  