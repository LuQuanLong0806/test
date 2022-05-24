import { faces } from "@/assets/js/face";

export const escapeHtml = (val = '') => {
    if (!val) return ''
    // 替换
    let result = val;
    let face = /\sface[\W{1,}]/g;
    console.log('face.test(result', result, face.test(result));
    if (face.test(result)) {
        let group = result.match(face)
        group.map(item => {
            console.log('item~', item);
            const key = item.match(/\[\S+\]/g)[0];
            result = result.replace(item, `<img src="${faces[key]}" />`);
        })
        console.log('group~', group);
    }
}
