export default function mainLoop() {
  window.requestAnimationFrame(mainLoop);
  console.log('mainloop');
}
mainLoop();
