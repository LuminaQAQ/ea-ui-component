import { EaMessageBoxElement } from "./components/index.js"
import { EaMessageBox } from "./utils/EaMessageBoxInstance.js"

window.$alert = EaMessageBox.alert
window.$confirm = EaMessageBox.confirm
window.$prompt = EaMessageBox.prompt

export { EaMessageBox, EaMessageBoxElement }