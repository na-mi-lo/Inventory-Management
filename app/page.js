'use client'
import Image from "next/image";
import {useState, useEffect} from 'react'
import {firestore} from '@/firebase'
import {Box, Typography} from '@mui/material'

export default function Home() {
  const [inventory, setInventory] = useState([])
  const [open, setOpen] = useState([])
  const [itemName, setItemName] = useState('')

  const updateInventory = async () => {
    const snapshot = query(collection(firestore, 'inventory'))
    const docs =await getDocs(snapshot)
    const inventoryList = []
    docs.forEach(doc) => {
      inventoryListpush({
        name: doc.id,
      ...doc.data(),
      })
    }
    setInventory(inventoryList)
  }

  return (
  <Box>
      <Typography variant="h1">Inventory Management</Typography>
    </Box>
  )
}
