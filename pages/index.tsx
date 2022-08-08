import { useState, useRef } from 'react'
import MetaMaskCard from '../components/Web3/Connector/MetaMaskCard'
import Provider from '../components/Web3/Provider'
import {
  Button,
  Box,
  Card,
  CardActions,
  Container
} from '@mui/material'
import { AccountBalanceWallet, SwapHoriz } from '@mui/icons-material'

import style from '../src/styles/index'
import FormInput from '../components/FormControl'
import ModalComponent from '../components/Modal/Modal'
import { hooks } from '../connectors/metaMask'
import { TOKENS as tokens, IToken } from '../src/constants/token'

const { useChainId, useAccounts, useIsActivating, useIsActive, useProvider, useENSNames } = hooks

export default function Home() {

  const chainId = useChainId()
  const accounts = useAccounts()
  const isActivating = useIsActivating()

  const isActive = useIsActive()

  const provider = useProvider()
  const ENSNames = useENSNames(provider)

  const [open, setOpen] = useState(!isActive)
  const [possessVal, setPossess] = useState<IToken>(tokens[0])
  const [wantsVal, setWants] = useState<IToken>(tokens[1])
  const possessRef = useRef<HTMLInputElement>();
  const wantsRef = useRef<HTMLInputElement>();

  const toggleModal = () => setOpen(!open)
  const toggleSwap = () => {
    setWants(possessVal)
    setPossess(wantsVal)
  }

  const handleChange = (firstVal, firstRef, firstHook, secondVal, secondHook) => {
    const sum = firstVal.price * parseFloat(firstRef.current.value)
    const wantsValue = parseFloat((sum / secondVal.price).toFixed(2))
    firstHook({ ...firstVal, value: Number(firstRef.current.value) })
    secondHook({ ...secondVal, value: wantsValue })
  }

  const properties = {
    possess: {
      base: {
        fullWidth: true
      },
      label: {
        displayText: possessVal.label,
      },
      input: {
        id: 'possess-id',
        label: possessVal.label,
        value: possessVal.value,
        onChange: () => {
          handleChange(wantsVal, wantsRef, setWants, possessVal, setPossess)
        }
      }
    },
    wants: {
      base: {
        fullWidth: true
      },
      label: {
        displayText: wantsVal.label,
      },
      input: {
        id: 'wants-id',
        label: wantsVal.label,
        value: wantsVal.value,
        onChange: () => {
          handleChange(possessVal, possessRef, setPossess, wantsVal, setWants)
        }
      }
    },
    modal: {
      open,
      onClose: () => toggleModal(),
      base: {
      }
    },
    metaMask: {
      chainId,
      accounts,
      isActivating,
      isActive,
      provider,
      ENSNames
    }
  }

  const { possess, wants, modal, metaMask } = properties

  return (
    <Container sx={style.container} maxWidth="lg">
      <Card sx={style.card}>
        <h2>Crypto Converter</h2>
        <FormInput refs={possessRef} {...possess} />
        <FormInput refs={wantsRef} {...wants} />
        <CardActions>
          <Button onClick={toggleSwap} variant="outlined"><SwapHoriz /></Button>
          <Button onClick={toggleModal} variant="outlined">Check Wallet <AccountBalanceWallet /></Button>
        </CardActions>
      </Card>
      <ModalComponent {...modal}>
        <Box sx={style.box}>
          <Provider />
          <MetaMaskCard {...metaMask} />
        </Box>
      </ModalComponent>
    </Container >
  )
}
