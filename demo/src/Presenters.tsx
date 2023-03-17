import { PresenterMapType } from 'storybook-design-token/dist/components/TokenPreview';

export const presenters: PresenterMapType = {
    'Image': ImagePresenter
};

function ImagePresenter({ token }: any) {
    return <div style={{ background: 'red' }}>{token.value}</div>;
}

//   registerPresenter('Image', ImagePresenter);
