interface MutationObs extends MutationObserverInit {
  removedNodes: boolean;
}

declare global {
  interface Window {
    MutationObserverInit: MutationObs;
    WebKitMutationObserver: MutationObserver;
    MozMutationObserver: MutationObserver;
  }
}

let callback = () => {};

function containsAOSNode(nodes: NodeListOf<HTMLElement> | HTMLCollection) {
  let i, currentNode, result;

  for (i = 0; i < nodes.length; i += 1) {
    currentNode = <HTMLElement>nodes[i];

    if (currentNode.dataset && currentNode.dataset.aos) {
      return true;
    }

    result = currentNode.children && containsAOSNode(currentNode.children);

    if (result) {
      return true;
    }
  }

  return false;
}

function check(mutations: MutationRecord[]) {
  if (!mutations) return;

  mutations.forEach((mutation) => {
    const addedNodes = Array.prototype.slice.call(mutation.addedNodes);
    const removedNodes = Array.prototype.slice.call(mutation.removedNodes);
    const allNodes = <NodeListOf<HTMLElement> | HTMLCollection>(
      (<unknown>addedNodes.concat(removedNodes))
    );

    if (containsAOSNode(allNodes)) {
      return callback();
    }
  });
}

function getMutationObserver() {
  return (
    window.MutationObserver ||
    window.WebKitMutationObserver ||
    window.MozMutationObserver
  );
}

function isSupported() {
  return !!getMutationObserver();
}

function ready(_selector: unknown, fn: () => void) {
  const doc = window.document;
  const MutationObserver = getMutationObserver();

  const observer = new MutationObserver(check);
  callback = fn;

  observer.observe(doc.documentElement, {
    childList: true,
    subtree: true,
    removedNodes: true,
  } as MutationObs);
}

export default { isSupported, ready };
