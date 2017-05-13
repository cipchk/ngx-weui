import { Component, ViewEncapsulation } from '@angular/core';
@Component({
    selector: 'docs-faq',
    template: `
    <div class="weui-article">
        <p>请转移至<a href="https://github.com/cipchk/ngx-weui" target="_blank">Github</a>，如有问题请按<a href="https://github.com/cipchk/ngx-weui#troubleshooting" target="_blank">Troubleshooting</a>提交Issues，谢谢！</p>
    </div>
    `,
    encapsulation: ViewEncapsulation.None
})
export class DocsFAQComponent {
    
}
