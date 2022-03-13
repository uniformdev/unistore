import { useRouter } from 'next/router';
import { useEffect } from 'react';
import getConfig from 'next/config';
import styles from './PreviewSwitch.module.scss';

// lazy preview function that polls when next preview mode is on,
// reloading static props every 2s. Need to update this to something that doesn't poll
// (cross-domain iframe comms?)
function usePreview(previewing: boolean) {
  const router = useRouter();

  useEffect(() => {
    if (!previewing) {
      return;
    }
    const timer = setTimeout(async () => {
      router.replace(router.asPath, undefined, { scroll: false });
    }, 2000);
    return () => clearTimeout(timer);
  });
}

function PreviewSwitch({ previewing }: { previewing: boolean }) {
  const router = useRouter();
  usePreview(previewing);
  const {
    serverRuntimeConfig: { previewSecret },
  } = getConfig();
  return (
    <button
      type="button"
      onClick={() => {
        const url = `/api/preview?slug=${router.asPath}${
          previewing ? '&disable=1' : `&secret=${previewSecret}`
        }`;

        router.push(url);
      }}
      className={[
        styles['preview-switch-button'],
        previewing ? styles['preview-switch-button-on'] : styles['preview-switch-button-off'],
      ].join(' ')}
    >
      {previewing ? <OnlineIcon /> : <OfflineIcon />}
      {/* {previewing ? "Turn off preview" : "Turn preview on"} */}
    </button>
  );
}

const OnlineIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    style={{ height: 30, width: 30, paddingTop: 5 }}
    viewBox="0 0 25 25"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M5.636 18.364a9 9 0 010-12.728m12.728 0a9 9 0 010 12.728m-9.9-2.829a5 5 0 010-7.07m7.072 0a5 5 0 010 7.07M13 12a1 1 0 11-2 0 1 1 0 012 0z"
    />
  </svg>
);

const OfflineIcon = () => (
  <svg
    style={{ height: 30, width: 30, paddingTop: 5 }}
    viewBox="0 0 25 25"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M18.364 5.636a9 9 0 010 12.728m0 0l-2.829-2.829m2.829 2.829L21 21M15.536 8.464a5 5 0 010 7.072m0 0l-2.829-2.829m-4.243 2.829a4.978 4.978 0 01-1.414-2.83m-1.414 5.658a9 9 0 01-2.167-9.238m7.824 2.167a1 1 0 111.414 1.414m-1.414-1.414L3 3m8.293 8.293l1.414 1.414"
    />
  </svg>
);

export default PreviewSwitch;
