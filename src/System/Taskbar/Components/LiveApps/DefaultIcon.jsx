export default function Icon({ isActive }) {
  return (
    <div>
      <div>
        <live-apps-button-circle class={isActive ? "live-apps-button-circle-red" : "live-apps-button-circle-off"} />
        <live-apps-button-circle class={isActive ? "live-apps-button-circle-green" : "live-apps-button-circle-off"} />
      </div>
      <div>
        <live-apps-button-circle class={isActive ? "live-apps-button-circle-blue" : "live-apps-button-circle-off"} />
        <live-apps-button-circle class={isActive ? "live-apps-button-circle-white" : "live-apps-button-circle-off"} />
      </div>
    </div>);
}