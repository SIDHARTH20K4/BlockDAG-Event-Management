// src/hooks/useCreateEvent.js
import { useWriteContract } from 'wagmi';
import { EventManager, EventManagerAbi } from '../constants/constants';

export const useCreateEvent = () => {
  const {
    writeContract,
    data: hash,
    isPending,
    isSuccess,
    error,
  } = useWriteContract();

  const createEvent = ({ title, location, date, price }) => {
    writeContract({
      address: EventManager,
      abi: EventManagerAbi,
      functionName: 'createEvent',
      args: [
        title,         // string
        location,      // string
        date,          // string
        BigInt(price), // uint256 (important: convert to BigInt!)
      ],
    });
  };

  return {
    createEvent,
    hash,
    isPending,
    isSuccess,
    error,
  };
};
