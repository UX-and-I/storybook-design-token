import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import React from 'react';

export const parameters = {
  designToken: {
    defaultTab: 'Images',
    styleInjection:
      '@import url("https://fonts.googleapis.com/css2?family=Open+Sans&display=swap");',
    //This doesn't work!
    presenters: {
      // Image: ImagePresenter
    }
  }
};

