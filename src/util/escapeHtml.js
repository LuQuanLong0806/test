import { faces } from "@/assets/js/face";

const htmlEncode = (html) => {
    let temp = document.createElement('div');

    temp.textContent != 'undefined' ? (temp.textContent = html) : (temp.innerText = html)

    const output = temp.innerHTML
    temp = null

    return output
}

export const escapeHtml = (val = '') => {
    if (!val) return ''
    let result = val;
    // 替换表情
    let face = /face\[\W{1,}\]/g;
    console.log('face.test(result)', face.test(result));
    if (face.test(result)) {
        let group = result.match(face)
        group.map(item => {
            const key = item.match(/\[\S+\]/g)[0];
            result = result.replace(item, `<img src="${faces[key]}" />`);
        })
    }
    // 替换图片
    let img = /img\[\S+\]/g;
    if (img.test(result)) {
        let group = result.match(img)
        group.map(item => {
            console.log('item', item, item.length, item.substring(4, item.length - 1));

            result = result.replace(item, `<img src="${item.substring(4, item.length - 1)}" />`);
        })
    }

    // 替换链接
    // a(链接)[标题]
    const link = /a\(\S+\]/g
    if (link.test(result)) {
        let group = result.match(link)

        const title = /\((.+)\)/;
        const linkName = /\[(.+)\]/

        group.map(item => {
            const nameGroup = item.match(linkName)
            let name = ''
            if (nameGroup.length > 0) {
                name = nameGroup[1]
            }
            const linkGroup = item.match(title)
            let link = ''
            if (linkGroup.length > 0) {
                link = linkGroup[1]
            }
            result = result.replace(item, `<a href="${link}" > ${name} </a>`);
        })
    }

    // 引用替换
    result = result.replace(/\[quote\]/g, '<div class="layui-elem-quote">');
    result = result.replace(/\[\/quote\]/g, '</div >');

    // 代码块替换

    const code = /(\[\/?pre(.+?)[^\]]*\])|\[[^\]]*\]/g;

    if (code.test(result)) {
        const group = result.match(code)
        group.map(d => {
            result = result.replace(d, htmlEncode(d))
        })

        result = result.replace(/\[pre\]/g, '<pre>');
        result = result.replace(/\[\/pre\]/g, '</pre>');
    }

    // hr替换
    result = result.replace(/\[hr\]/g, '<hr>')

    return result

}
