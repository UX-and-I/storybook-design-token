import addons, { makeDecorator, StoryContext, StoryGetter } from '@storybook/addons';

export const withDesignToken = makeDecorator({
  name: 'withDesignToken',
  parameterName: 'designToken',
  wrapper: (getStory: StoryGetter, context: StoryContext) => {
    const channel = addons.getChannel();

    channel.emit('design-token/init');

    return getStory(context);
  }
});
