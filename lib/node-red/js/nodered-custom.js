window.onload = async () => {
  let uriConfigAdmin = document.location.origin + "/red/config/admin"
  let apiUri = await initApi(uriConfigAdmin)

  async function initApi(uriConfigAdmin) {
    const uri = await fetch(uriConfigAdmin, {
      "method": "GET",
      "headers": {}
    }).then(response => {
      return response.json()
    }).then(data => {
      return data
    }).catch(err => {
      console.log("ERR", err)
    })

    return uri.admin
  }

  setTimeout(function () {
    removeRedUiTabs()
  }, 500)

  function removeRedUiTabs() {
    const reduiTabsContainer = document.getElementById('red-ui-workspace-tabs')
    const reduiTabs = reduiTabsContainer.getElementsByClassName('red-ui-tab')
    let toRemove = []
    for (let i = 0; i < reduiTabs.length; i++) {
      if (!reduiTabs[i].classList.contains('active')) {
        toRemove.push(reduiTabs[i])
      }
    }
    for (let j = 0; j < toRemove.length; j++) {
      toRemove[j].parentNode.removeChild(toRemove[j])
    }
  }

  async function getFullFlow(workspaceId) {
    const fullFlow = RED.nodes.createCompleteNodeSet()
    let configNodeIds = []
    let formattedFlow = fullFlow
      .filter(flow => flow.id === workspaceId || flow.z === workspaceId)
      .map(flow => {
        if (flow.type === 'linto-config') {
          configNodeIds.push(flow.configMqtt)
          configNodeIds.push(flow.configEvaluate)
          configNodeIds.push(flow.configTranscribe)
        }
        return flow
      })
    let configNodes = fullFlow.filter(flow => configNodeIds.indexOf(flow.id) >= 0)
    formattedFlow.push(...configNodes)
    return formattedFlow
  }

  async function saveTmpFlow(flow) {
    const payload = {
      payload: flow,
      workspaceId: window['workspace_active']
    }
    let updateTmp = await fetch(new Request(`${apiUri}/flow/tmp`), {
      method: 'put',
      headers: new Headers({
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify(payload)
    }).then(function (response) {
      return response.json()
    }).then(function (data) {
      return data
    })

    if (updateTmp.status === 'error') {
      alert('an error has occured')
    }
  }

  // Save TMP Flow on change workspace
  RED.events.on('workspace:change', async function (status) {
    window['workspace_active'] = status.workspace
    const fullFlow = await getFullFlow(window['workspace_active'])
    await saveTmpFlow(fullFlow)
  })

  // Save TMP Flow on change nodes
  RED.events.on('nodes:change', async function () {
    try {
      window['workspace_active'] = RED.workspaces.active()
      const fullFlow = await getFullFlow(window['workspace_active'])
      await saveTmpFlow(fullFlow)
    }
    catch (err) {
      console.log(err)
    }
  })
}
