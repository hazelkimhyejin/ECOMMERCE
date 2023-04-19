import { useMutation, useQueryClient } from "react-query"
import { updateOrder } from "../../api/order"
import useToastSuccess from "../../hooks/useToastSuccess"
import useToastError from "../../hooks/useToastError"
import useAuthDetails from "../../hooks/useAuthDetails"
import { whatsapp } from "../../api/whatsapp"

const OrderCrm = ({
    id, buyerName, price, quantity, name, mobile
}) => {

    const { accessToken } = useAuthDetails()
    const queryClient = useQueryClient()

    const mutation = useMutation(formData => updateOrder(formData), 
    {
        onError: (response) => {
            
            console.log(response)
        },
        onSuccess: (response) => {
            
            // console.log(response)
            if (response.status === 200) {
                useToastSuccess("Order updated")   
                // re render order status in AdminOrderCard by invalidating cache with order id key
                queryClient.invalidateQueries(['orderAdmin', `${id}`])
            } 
        },
    })

    const whatsappMutation = useMutation((formData) => whatsapp(formData, accessToken), 
    {
        onError: (response) => {
            
            console.log(response)
        },
        onSuccess: (response) => {
            
            console.log(response)
            if (response.status === 201) {
                useToastSuccess("WhatsApp sent")   
            } else useToastError("Error: WhatsApp not sent")
        },
    })

    const paymentNotMade = () => {
        const formData = {
            "fulfil": "false",
            "cancel": "false",
            "paid": "false",
            "collect": "false",
            "id": id
        }
        mutation.mutate(formData)
    }
    const paymentMade = () => {
        const formData = {
            "fulfil": "false",
            "cancel": "false",
            "paid": "true",
            "collect": "false",
            "id": id
        }
        mutation.mutate(formData)
    }
    const collected = () => {
        const formData = {
            "fulfil": "true",
            "cancel": "false",
            "paid": "true",
            "collect": "true",
            "id": id
        }
        mutation.mutate(formData)
    }
    const cancelled = () => {
        const formData = {
            "fulfil": "false",
            "cancel": "true",
            "paid": "false",
            "collect": "false",
            "id": id
        }
        mutation.mutate(formData)
    }
    const refundPending = () => {
        const formData = {
            "fulfil": "false",
            "cancel": "true",
            "paid": "true",
            "collect": "false",
            "id": id
        }
        mutation.mutate(formData)
    }

    const paymentReminder = () => {
        const message = 
            `FROM GROUPBUY: Hi ${buyerName}, you have not paid $${price*quantity} for ${quantity}nos of ${name}. Please login to GroupBuy for payment details.`
        whatsappMutation.mutate({message: message, mobile: mobile}, accessToken)
        }
    const paymentReceived = () => {
        const message = 
            `FROM GROUPBUY: Hi ${buyerName}, we have received $${price*quantity} for your order of ${quantity}nos of ${name}. Thank you.`
        whatsappMutation.mutate({message: message, mobile: mobile}, accessToken)
        }
    const readyForCollection = () => {
        const message = 
            `FROM GROUPBUY: Hi ${buyerName}, your order of ${quantity}nos of ${name} is ready for collection.`
        whatsappMutation.mutate({message: message, mobile: mobile}, accessToken)
        }
    const refundProcessed = () => {
        const message = 
            `FROM GROUPBUY: Hi ${buyerName}, your payment of $${quantity*price} has been refunded.`
        whatsappMutation.mutate({message: message, mobile: mobile}, accessToken)
        }

    

  return (
    <>
        <div className="divider">Payment</div>
        <button className="btn btn-primary mx-3 my-2 w-72" 
            onClick={paymentNotMade}>Payment pending</button> 
        <button className="btn btn-success mx-3 my-2 w-72" 
            onClick={paymentReminder}>WhatsApp: Payment Reminder                
        </button>
        <button className="btn btn-primary mx-3 my-2 w-72" 
            onClick={paymentMade}>Payment made</button>            
        <button className="btn btn-success mx-3 my-2 w-72"
            onClick={paymentReceived}>WhatsApp: Payment Received                
        </button>

        <div className="divider">Collection</div>
        <button className="btn btn-success mx-3 my-2 w-72"
            onClick={readyForCollection}>WhatsApp: Ready for collection</button>
        <button className="btn btn-primary mx-3 my-2 w-72"
            onClick={collected}>Collected</button>

        <div className="divider">Cancellation / Refund</div>
        <button className="btn btn-primary mx-3 my-2 w-72"
            onClick={cancelled}>Order cancelled</button>
        <button className="btn btn-primary mx-3 my-2 w-72"
            onClick={refundPending}>Refund pending</button>
        <button className="btn btn-success mx-3 my-2 w-72"
            onClick={refundProcessed}>WhatsApp: Refund processed                
        </button>
    </>
  )
}

export default OrderCrm