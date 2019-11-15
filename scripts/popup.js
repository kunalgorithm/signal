import browser from "webextension-polyfill";
import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import debugMaker from "debug";
// eslint-disable-next-line no-unused-vars
const debug = debugMaker("app:popup");

import { getDomainBackgroundA, updateStorage } from "./shared/utils.js";
import siteConfig from "./shared/siteConfig.js";

debug("Running popup script");
function Options() {
  const [optionMapping, setOptionMapping] = useState({});
  useEffect(() => {
    for (let domain of Object.keys(siteConfig)) {
      browser.storage.sync.get([domain]).then(storage => {
        debug("Setting base", domain);
        const domainStorage = storage[domain];
        if (!domainStorage) return;
        debug("Exists base", domain);
        const isHidingDomain = domainStorage.shouldHide;

        setOptionMapping(prevOptions => ({
          ...prevOptions,
          [domain]: isHidingDomain
        }));
      });

      browser.storage.onChanged.addListener(changes => {
        const domainStorage = changes[domain];
        if (!domainStorage) {
          return;
        }

        const curSetting = domainStorage.newValue.shouldHide;
        if (domainStorage.oldValue.shouldHide !== curSetting) {
          setOptionMapping(prevOptions => ({
            ...prevOptions,
            [domain]: domainStorage.newValue.shouldHide
          }));
        }
      });
    }
  }, []);

  function handleToggleCheck(e) {
    updateStorage(e.target.name, { shouldHide: e.target.checked }).catch(err =>
      console.error("Failed to update storage", err)
    );
  }

  let optionList = [];
  for (let domain of Object.keys(optionMapping)) {
    const isHidingDomain = optionMapping[domain];
    const domainTitle = domain.split(".").filter(w => w !== "www")[0];
    const listElement = (
      <div className="list-element" key={domain}>
        <input
          id={domain}
          className="check"
          type="checkbox"
          name={domain}
          checked={isHidingDomain}
          onChange={handleToggleCheck}
        />
        <label htmlFor={domain} className="domain-name">
          {domainTitle}
        </label>
      </div>
    );
    optionList.push(listElement);
  }

  return <div className="list-container"> {optionList} </div>;
}

ReactDOM.render(<Options />, document.getElementById("root"));
