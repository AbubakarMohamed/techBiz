'use client';

import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ModalInlineCalendly({
  url="https://calendly.com/techbizlimited0/30min?hide_event_type_details=1&hide_gdpr_banner=1",
  hideEventTypeDetails = false,
  hideGDPRBanner = false,
  isOpen,
  onClose,
}) {
  useEffect(() => {
    const scriptId = 'calendly-widget-script';
    if (!document.getElementById(scriptId)) {
      console.log('Loading Calendly script...');
      const script = document.createElement('script');
      script.id = scriptId;
      script.src = 'https://assets.calendly.com/assets/external/widget.js';
      script.async = true;
      script.onload = () => {
        console.log('Calendly script loaded successfully');
        console.log('Window.Calendly available:', !!window.Calendly);
      };
      script.onerror = () => {
        console.error('Failed to load Calendly script');
      };
      document.head.appendChild(script);
    } else {
      console.log('Calendly script already exists');
      console.log('Window.Calendly available:', !!window.Calendly);
    }
  }, [])

  // Ensure widget reinitializes when modal opens
  useEffect(() => {
    if (isOpen) {
      console.log('Modal opened, checking Calendly...');
      console.log('Window.Calendly exists:', !!window.Calendly);

      // Small delay to ensure DOM is ready
      const timer = setTimeout(() => {
        const widget = document.querySelector('.calendly-inline-widget');
        console.log('Widget element found:', !!widget);
        if (widget) {
          console.log('Widget data-url:', widget.getAttribute('data-url'));
        }

        // Force widget initialization if Calendly is loaded
        if (window.Calendly && widget) {
          window.Calendly.initInlineWidget({
            url: widget.getAttribute('data-url'),
            parentElement: widget
          });
        }
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const params = new URLSearchParams();
  if (hideEventTypeDetails) params.set('hide_event_type_details', '1');
  if (hideGDPRBanner) params.set('hide_gdpr_banner', '1');
  const fullUrl = `${url}${url.includes('?') ? '&' : '?'}${params.toString()}`;

  console.log('ModalInlineCalendly render - isOpen:', isOpen);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 bg-black/60"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div
            className="absolute inset-0"
            onClick={onClose}
          >
            {/* Close button overlayed */}
            <button
              className="absolute top-4 right-4 z-60 text-white bg-black/50 rounded-full p-2"
              onClick={onClose}
            >
              X
            </button>
            {/* Calendly inline full */}
            <div
              className="w-full h-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div
                className="calendly-inline-widget w-full h-full"
                data-url={fullUrl}
                style={{ minWidth: '100%', height: '100%' }}
              ></div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
