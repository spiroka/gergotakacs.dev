import slugify from '@sindresorhus/slugify';

export default function (plop) {
  plop.setGenerator('post', {
    async prompts(inquirer) {
      const { title } = await inquirer.prompt({
        name: 'title',
        message: 'Title',
        type: 'input'
      });

      return {
        title,
        slug: slugify(title),
        date: new Date().toISOString()
      };
    },
    actions: [
      {
        type: 'add',
        path: 'src/blog/{{slug}}/index.md',
        templateFile: 'templates/post.md'
      }
    ]
  });
}
