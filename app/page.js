'use client'
import Image from "next/image";
import {useState, useEffect} from 'react'
import {firestore} from '@/firebase'
import {
  collection,
  getDocs,
  query,
  setDoc,
  deleteDoc,
  getDoc, 
  doc
} from 'firebase/firestore'
import {
  Box, 
  Modal, 
  Typography, 
  Stack, 
  TextField, 
  Button
} from '@mui/material'

export default function Home() {
  const [inventory, setInventory] = useState([])
  const [open, setOpen] = useState(false)
  const [itemName, setItemName] = useState('')

  //Updating the inventory of the items
  const updateInventory = async () => {
    const snapshot = query(collection(firestore, 'inventory'))
    const docs =await getDocs(snapshot)
    const inventoryList = []
    docs.forEach((doc) => {
      inventoryList.push({
        name: doc.id,
      ...doc.data(),
      })
    })
    setInventory(inventoryList)
    //connectFirestoreEmulator.log(inventoryList)
  }

  //Method to remove items
  const removeItem = async (item) =>{
    const docRef = doc(collection(firestore, 'inventory'), item)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
      //getting the quanity from the data
      const {quantity} = docSnap.data()
      if (quanitty == 1) {
        //deleting the quantity
        await deleteDoc(docRef)
      } else {
        //Decresing the quantity
        await setDoc(docRef, {quantity: quantity - 1})
      }
    }
    await updateInventory()
  }

  //Method to add items
  const addItem = async (item) =>{
    const docRef = doc(collection(firestore, 'inventory'), item)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
      //getting the quanity from the data
      const {quantity} = docSnap.data()
      await setDoc(docRef, {quantity: quantity + 1})
    } else {
      //Createing a new item
      await setDoc(docRef, {quantity: 1})
    }
    await updateInventory()
  }

  useEffect(() => {
    updateInventory()
  }, [])

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return (
    <Box 
      width="100vw" 
      height="100vh" 
      display="flex"
      flexDirection="column"
      justifyContent="center" 
      alignItems="center"
      gap={2}
    >
      <Modal open={open} anClose={handleClose}>
        <Box
          position="absolute"
          top="50%"
          left="50%"
          width={400}
          bgcolor="pink"
          border="2px solid white"
          boxShadow={30}
          p={4}
          display="flex"
          flexDirection="column"
          gap={3}
          sx={{
            transform: 'translate(-50%, -50%)',
          }}
        >
          <Typography variant="h6">Add Item</Typography>
          <Stack width="100%" direction="row" spacing={2}>
            <TextField
              variant="outlined"
              fullWidth
              value={itemName}
              onChange={(e) => {
                setItemName(e.target.value)
              }}
            />
            <Button
              variant="outlined"
              onClick={()=> {
                addItem(itemName)
                setItemName('')
                handleClose()
              }}
            >Add</Button>
          </Stack>
        </Box>
      </Modal>
      <Button 
      variant="contained"
      onClick={()=> {
          handleOpen()
        }}
      >
      Add New Item</Button>
      <Box border="1px solid #333">
        <Box 
        width="800px" 
        height="100px" 
        bgcolor="#DAF7A6"
        display="flex"
        alignItem="center"
        justifyContent="center">
          <Typography variant="h2" color="#1b3f4c">Inventory Items</Typography>
        </Box>
      <Stack width="800px" height="300px" spacing={2} overflow="auto">
          {
            inventory.map(({name, quantity})=> (
              <Box 
              key={name} 
              width="100%"
              minHeight="150px"
              display="flex"
              alignItems="center"
              justifyContent="center"
              bgColor="#f0f0f0"
              padding={5}
            >
              <Typography variant='h3' color='#bbf9c0' textAlign='center'
              >
                  {name.charAt(0).toUpperCase() + name.slice(1)}
              </Typography>
              <Typography variant='h3' color='#bbf9c0' textAlign='center'
              >
                  {quantity}
              </Typography>
              <Button 
                variant="contained" 
                onClick={()=>{
                  removeItem(name)
                }}
              >Remove
              </Button>
            </Box>
            ))}
      </Stack>
      </Box>
    </Box>
  )
}
/*
<Typography variant="h1">Inventory Management</Typography>      
{inventory.forEach((item)=>{
  console.log(item)
  return(
  <>
  {item.name}
  {item.count}
  </>
  )
})}*/
