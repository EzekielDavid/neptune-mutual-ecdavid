import { Web3ReactHooks } from '@web3-react/core'
import { MetaMask } from '@web3-react/metamask'
import { Accounts } from './Accounts'
import { Chain } from './Chain'
import { ConnectWithSelect } from './ConnectWithSelect'
import { Status } from './Status'
import Typography from '@mui/material/Typography'
import Container from  '@mui/material/Container'

interface Props {
  connector: MetaMask
  chainId: ReturnType<Web3ReactHooks['useChainId']>
  isActivating: ReturnType<Web3ReactHooks['useIsActivating']>
  isActive: ReturnType<Web3ReactHooks['useIsActive']>
  error: Error | undefined
  setError: (error: Error | undefined) => void
  ENSNames: ReturnType<Web3ReactHooks['useENSNames']>
  provider?: ReturnType<Web3ReactHooks['useProvider']>
  accounts?: string[]
}

export function Card({
  connector,
  chainId,
  isActivating,
  isActive,
  error,
  setError,
  ENSNames,
  accounts,
  provider,
}: Props) {
  return (
    <Container
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        width: '20rem',
        overflow: 'auto',
      }}
    >
      <Typography id="modal-modal-title" variant="h6" component="h2">
        Wallet Details
      </Typography>
      <div style={{ marginBottom: '1rem' }}>
        <Status isActivating={isActivating} isActive={isActive} error={error} />
      </div>
      <Chain chainId={chainId} />
      <div style={{ marginBottom: '1rem' }}>
        <Accounts accounts={accounts} provider={provider} ENSNames={ENSNames} />
      </div>
      <ConnectWithSelect
        connector={connector}
        chainId={chainId}
        isActivating={isActivating}
        isActive={isActive}
        error={error}
        setError={setError}
      />
    </Container>
  )
}
