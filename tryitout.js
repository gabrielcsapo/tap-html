module.exports = {
    title: 'tap-html',
    nav: {
      Source: 'https://github.com/gabrielcsapo/tap-html',
      Storybook: './storybook/index.html',
      Example: './example/index.html'
    },
    body: `
      <div class="text-center">
        <h3 class="text-black">tap-html</h3>
        <div class="text-black">📊 an html tap reporter</div><br/>
        <small><pre>tape test | tap-html --out report.html</pre></small>
        <div style="width:60%;margin: 0 auto;">
          <img class="responsive" src="./example.png" alt="">
        </div>
      </div>
    `,
    template: 'landing',
    options: {
      width: '100%'
    },
    output: './docs',
    footer: `
      <div class="text-black">Made with ☕️ by <a href="http://www.gabrielcsapo.com">@gabrielcsapo</a></div>
    `
}
