import React from 'react';
import { Story, Meta } from '@storybook/react';
import ProductDescription, { ProductDescriptionProps } from '.';

export default {
  title: 'Commerce/ProductDescription',
  component: ProductDescription,
  argTypes: {},
} as Meta;

const Template: Story<ProductDescriptionProps> = args => (
  <ProductDescription {...args}>
    <span>Primary</span>
  </ProductDescription>
);

export const Primary = Template.bind({});
Primary.args = {
  product: {
    id: 0,
    name: 'name',
    type: 'digital',
    weight: 0,
    price: 0,
    description:
      'Volume 13 of Smith Journal is crammed with more than its fair share of sharp minds. Top of the list would have to be Solomon Shereshevsky, who remembered every single thing he’d ever come across – a great skill to have when it came to party tricks, but enough to send him crackers. And then there’s Delbert Trew who spends more time than you can imagine thinking about something very sharp indeed: barbed wire. You can’t go past Samuel Morse, either, who was a famous portrait painter before he gave his name to the code he invented. What a genius! And we’re pretty taken with Noel Turner, who was smart enough to get around some pretty weird New Zealand laws to invent a car that, for a while, was a huge success. As well, you’ll find stories on a cross-dressing spy, a couple of Sydney nerds who revolutionised modern music, court illustration, big wheels, the dubious science of controlling the weather and a whole stack of other stuff.\n',
  },
  title: 'About this product',
};
