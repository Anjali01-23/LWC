import { LightningElement } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class CopyClipboard extends LightningElement {
    textToCopy = 'Copy this text!';

    handleChange(event) {
        this.textToCopy = event.target.value;
    }

    handleCopy() {
        try {
            // 🔥 Fallback method (works in LWC)
            const textarea = document.createElement('textarea');
            textarea.value = this.textToCopy;
            document.body.appendChild(textarea);

            textarea.select();
            document.execCommand('copy');

            document.body.removeChild(textarea);

            this.showToast('Success', 'Text copied!', 'success');

        } catch (err) {
            console.error('Copy failed', err);
            this.showToast('Error', 'Copy failed', 'error');
        }
    }

    showToast(title, message, variant) {
        this.dispatchEvent(
            new ShowToastEvent({
                title,
                message,
                variant
            })
        );
    }
}