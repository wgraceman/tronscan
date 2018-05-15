export function createSimpleFunctional(cssClass, el = 'div', name) {
  name = name || cssClass.replace(/__/g, '-')

  return {
    name: `v-${name}`,
    functional: true,

    render: (createElement, { data, children }) => {
      data.staticClass = (`${c} ${data.staticClass || ''}`).trim()

      return createElement(el, data, children)
    }
  }
}

export const numberWithCommas = (x) => {
  var parts = x.toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return parts.join(".");
}
