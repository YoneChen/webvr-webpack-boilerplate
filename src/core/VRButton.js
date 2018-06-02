import './css/vr-button';
// VR button controller
const VRButton = {
    init(container,display,renderer) {
        const button = document.createElement('div');
        button.classList.add('vr-button','on');
        container.appendChild(button);
		if ( display && display.displayName !== 'Mouse and Keyboard VRDisplay (webvr-polyfill)') {
			button.addEventListener('click', e => {
                e.preventDefault();
				display.isPresenting ? display.exitPresent() : display.requestPresent( [ { source: renderer.domElement } ] );

			});

			window.addEventListener( 'vrdisplaypresentchange', e => {
				if (display.isPresenting) {
                    button.classList.remove('on');
                } else {
                    button.classList.add('on');
                }

			}, false );

		} else {
			button.remove();
		}
	}

};
export default VRButton;