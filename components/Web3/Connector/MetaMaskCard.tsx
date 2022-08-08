import { useEffect, useState } from 'react'
import { Card } from '../Card'

import { metaMask } from '../../../connectors/metaMask'

export default function MetaMaskCard(props) {
  const { chainId, isActivating, isActive, accounts, provider, ENSNames } = props

  const [error, setError] = useState(undefined)

  useEffect(() => {
    void metaMask.connectEagerly().catch(() => {
      console.debug('Failed to connect eagerly to metamask')
    })
  }, [])

  return (
    <Card
      connector={metaMask}
      chainId={chainId}
      isActivating={isActivating}
      isActive={isActive}
      error={error}
      setError={setError}
      accounts={accounts}
      provider={provider}
      ENSNames={ENSNames}
    />
  )
}
