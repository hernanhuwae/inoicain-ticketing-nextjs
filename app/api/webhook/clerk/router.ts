import { Webhook } from 'svix'
import { headers } from 'next/headers'
import { clerkClient, WebhookEvent } from '@clerk/nextjs/server'
import { createUser, deleteUser, updateUser } from '@/lib/controllers/user.controller'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  // You can find this in the Clerk Dashboard -> Webhooks -> choose the endpoint
  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET

  if (!WEBHOOK_SECRET) {
    throw new Error('Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local')
  }

  // Get the headers
  const headerPayload = headers()
  const svix_id = headerPayload.get('svix-id')
  const svix_timestamp = headerPayload.get('svix-timestamp')
  const svix_signature = headerPayload.get('svix-signature')

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response('Error occured -- no svix headers', {
      status: 400,
    })
  }

  // Get the body
  const payload = await req.json()
  const body = JSON.stringify(payload)

  // Create a new Svix instance with your secret.
  const wh = new Webhook(WEBHOOK_SECRET)

  let evt: WebhookEvent

  // Verify the payload with the headers
  try {
    evt = wh.verify(body, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    }) as WebhookEvent
  } catch (err) {
    console.error('Error verifying webhook:', err)
    return new Response('Error occured', {
      status: 400,
    })
  }

  // Do something with the payload
  // For this guide, you simply log the payload to the console
  const { id } = evt.data
  const eventType = evt.type
  
  if(eventType=== 'user.created'){
    const {id,email_addresses,first_name,last_name,image_url,username}= evt.data


    const user={
        //Todo: All fields based on types/indes.ts
        clerkId:id,
        email:email_addresses[0].email_address,
        username:username!,
        firstName:first_name!,
        lastName:last_name!,
        photo:image_url
    }

    const newUser= await createUser(user)

    if(newUser){
      await clerkClient.users.updateUserMetadata(id,{
        publicMetadata:{
          userId: newUser._id
        }
      })
    }

    return NextResponse.json({message:'ok', user:newUser})
  }


  if(eventType== 'user.updated'){
    const {id,first_name,last_name,username,image_url}=evt.data

    const user={

      //Todo: All fields based on types/indes.ts
      username: username!,
      firstName: first_name!,
      lastName: last_name!,    
      photo: image_url
    }

    const userUpdate= await updateUser(id, user)

    return NextResponse.json({message:"ok", user:userUpdate})
  }


  if(eventType=='user.deleted'){
    const {id}=evt.data

    const userDelete= await deleteUser(id!)


    return NextResponse.json({message:"ok", user: userDelete})
  }

  return new Response('', { status: 200 })
}

