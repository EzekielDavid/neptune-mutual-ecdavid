import { useCallback, useState } from 'react'
import type { Web3ReactHooks } from '@web3-react/core'
import type { MetaMask } from '@web3-react/metamask'
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { CHAINS, getAddChainParameters } from '../../src/constants/chains';
function ChainSelect({
  chainId,
  switchChain,
  displayDefault,
  chainIds,
}: {
  chainId: number
  switchChain: (chainId: number) => void | undefined
  displayDefault: boolean
  chainIds: number[]
}) {

  const handleChange = (event: SelectChangeEvent<number>) => {
    switchChain?.(Number(event.target.value))
  }

  return (
    <Select
      value={Number(chainId)}
      onChange={handleChange}
      disabled={switchChain === undefined}
    >
      {displayDefault ? <MenuItem value={-1}>Default Chain</MenuItem> : null}
      {chainIds.map((chainId) => (
        <MenuItem key={chainId} value={chainId}>
          {CHAINS[chainId]?.name ?? chainId}
        </MenuItem>
      ))}
    </Select>
  )
}

export function ConnectWithSelect({
  connector,
  chainId,
  isActivating,
  isActive,
  error,
  setError,
}: {
  connector: MetaMask
  chainId: ReturnType<Web3ReactHooks['useChainId']>
  isActivating: ReturnType<Web3ReactHooks['useIsActivating']>
  isActive: ReturnType<Web3ReactHooks['useIsActive']>
  error: Error | undefined
  setError: (error: Error | undefined) => void
}) {
  const chainIds = (Object.keys(CHAINS)).map((chainId) => Number(chainId))

  const [desiredChainId, setDesiredChainId] = useState<number>(-1)

  const switchChain = useCallback(
    (desiredChainId: number) => {
      setDesiredChainId(desiredChainId)
      // if we're already connected to the desired chain, return
      if (desiredChainId === chainId) {
        setError(undefined)
        return
      }

      // if they want to connect to the default chain and we're already connected, return
      if (desiredChainId === -1 && chainId !== undefined) {
        setError(undefined)
        return
      }


      connector
        .activate(desiredChainId === -1 ? undefined : getAddChainParameters(desiredChainId))
        .then(() => setError(undefined))
        .catch(setError)
    },
    [connector, chainId, setError]
  )

  const onClick = useCallback((): void => {
    setError(undefined)
    connector
      .activate(desiredChainId === -1 ? undefined : getAddChainParameters(desiredChainId))
      .then(() => setError(undefined))
      .catch(setError)
  }, [connector, desiredChainId, setError])

  if (error || isActivating) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <ChainSelect
          chainId={desiredChainId}
          switchChain={switchChain}
          displayDefault={true}
          chainIds={chainIds}
        />
        <div style={{ marginBottom: '1rem' }} />
        <button onClick={onClick}>Try Again?</button>
      </div>
    )
  } else if (isActive) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <ChainSelect
          chainId={desiredChainId === -1 ? -1 : chainId}
          switchChain={switchChain}
          displayDefault={true}
          chainIds={chainIds}
        />
        <div style={{ marginBottom: '1rem' }} />
        <Button
          variant="outlined"
          onClick={() => {
            if (connector?.deactivate) {
              void connector.deactivate()
            } else {
              void connector.resetState()
            }
          }}
        >
          Disconnect
        </Button>
      </div>
    )
  } else {
    return (
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <ChainSelect
          chainId={desiredChainId}
          switchChain={isActivating ? undefined : switchChain}
          displayDefault={true}
          chainIds={chainIds}
        />
        <div style={{ marginBottom: '1rem' }} />
        <Button
          variant="outlined"
          onClick={
            isActivating
              ? undefined
              : () => connector
                .activate(desiredChainId === -1 ? undefined : getAddChainParameters(desiredChainId))
                .then(() => setError(undefined))
                .catch(setError)
          }
          disabled={isActivating}
        >
          Connect
        </Button>
      </div>
    )
  }
}
