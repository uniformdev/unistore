export const contentstackModelConverter = ({ parameter }: any) => {
  const entry = parameter.value;
  return entry ? convertContentstackObject(entry) : parameter.value;
};

function convertContentstackObject(content: any) {
  Object.keys(content).map((fieldKey) => {
    // contentstack image field transformation to a uniform model
    if (
      content[fieldKey]?.content_type &&
      content[fieldKey]?.content_type.startsWith('image/')
    ) {
      content[fieldKey] = transformContentstackImage(content[fieldKey]);
    }
    if (Array.isArray(content[fieldKey])) {
      content[fieldKey] = content[fieldKey].map((o) =>
        convertContentstackObject(o)
      );
    } else {
      camelCaseProps(fieldKey, content);
    }
  });

  return content;
}

function camelCaseProps(fieldKey: string, contentStackObject: any) {
  if (fieldKey.indexOf('_') >= 0) {
    const sourceKeyStringArray = Array.from(fieldKey);
    const newKeyArray = new Array<string>();
    let uppercaseIndex: number = -1;
    sourceKeyStringArray.forEach((value: string, index: number) => {
      if (value === '_' && index > 0) {
        uppercaseIndex = index + 1;
      } else {
        newKeyArray.push(
          index === uppercaseIndex ? value.toUpperCase() : value
        );
      }
    });
    contentStackObject[newKeyArray.join('')] = contentStackObject[fieldKey];
    delete contentStackObject[fieldKey];
  }
}

function transformContentstackImage(contentStackImage: any) {
  return {
    src: contentStackImage?.url,
    alt: contentStackImage?.title,
    // sourceData: {
    //   ...contentStackImage,
    // },
  };
}
