import { Destination } from '../types';
import flightsImg from '../../images/flights.jpg';
import hotelsImg from '../../images/hotels.jpg';
import holidayPackagesImg from '../../images/holidaypackages.jpg';
import ferryImg from '../../images/ferry.jpg';
import busImg from '../../images/bus.jpg';
import groundTransportationImg from '../../images/groundtransportation.jpg';
import visaAssistanceImg from '../../images/visaassistance.jpg';
import travelInsuranceImg from '../../images/travelinsurance.jpg';
import afterHoursImg from '../../images/after-hours.jpg';

export const destinations: Destination[] = [
  {
    id: 1,
    name: `Flights`,
    image: flightsImg,
    shortDescription: `Sit back and relax; we'll take care of everything, including your flights.`,
    fullDescription: `Sit back and relax; we'll take care of everything, including your flights. Once booked, you'll receive an electronic ticket granting access to a seat in the sky. All you need to do is arrive at the airport check-in, and you then can effortlessly collect your boarding pass. Travel doesn't have to be stressful, and with us, it won't be.`
  },
  {
    id: 2,
    name: `Hotels`,
    image: hotelsImg,
    shortDescription: `Searching for the perfect hotel online can take up way too much time.`,
    fullDescription: `Searching for the perfect hotel online can take up way too much time. Worry not, as we will take care of the hotel bookings for you. Whether it be simple rooms or extravagant suites, we will help you book it, making it easier for you. You will have a confirmed booking, so all that's left for you is to check in and relish in the rewarding comfort. To travel stress free all it takes is the right accommodation.`
  },
  {
    id: 3,
    name: `Holiday Packages`,
    image: holidayPackagesImg,
    shortDescription: `Leave the planning to us with our bundled holiday packages.`,
    fullDescription: `Leave the planning to us. Everything from flights, hotel stays, provided meals, and even guided tours and transport is taken care of. All our holiday packages come at a fixed price which ensures the most efficient travel experience, both upfront and after everything is completed bundled with the peace of mind knowing that everything has been taken care of.`
  },
  {
    id: 4,
    name: `FERRY`,
    image: ferryImg,
    shortDescription: `We take care of your ferry ticket bookings for you—simple, dependable, and hassle-free.`,
    fullDescription: `We take care of your ferry ticket bookings for you—simple, dependable, and hassle-free. Regardless of whether it's a one-way journey or a usual return travel, we manage everything with the ferry operator for you. All booking information will be provided in advance, and your ticket will be finalized after payment is made. Just get on the boat and sail—no hassle or guesswork.`
  },
  {
    id: 5,
    name: `BUS`,
    image: busImg,
    shortDescription: `We manage your bus tickets for you to ensure your entire journey is hassle free.`,
    fullDescription: `We manage your bus tickets for you to ensure your entire journey is hassle free. Following payment, you will receive an official ticket through email which guarantees your seat during the ride. There are no unexpected events and no stress. Simply get on and enjoy the trip.`
  },
  {
    id: 6,
    name: `GROUND TRANSPORTATION`,
    image: groundTransportationImg,
    shortDescription: `If you require pick up services from the airport, or a drive around the city, we cover all types of ground transportation.`,
    fullDescription: `If you require pick up services from the airport, or a drive around the city, we cover all types of ground transportation. Our reliable and comfortable vehicles thru our partner are punctual and always get you to your destination on time. You can sit back relax and let us do the driving.`
  },
  {
    id: 7,
    name: `VISA ASSISTANCE`,
    image: visaAssistanceImg,
    shortDescription: `The visa is often a difficult area to navigate, however with our services we will make it simple for you.`,
    fullDescription: `The visa is often a difficult area to navigate, however with our services we will make it simple for you. With our visa assistance we guide you through the entire process from paperwork, submission and all aspects that prepare you for your trip without any stress. Be it business or leisure travel, we cover all.`
  },
  {
    id: 8,
    name: `TRAVEL INSURANCE`,
    image: travelInsuranceImg,
    shortDescription: `Our travel insurance services cover you whether you are traveling abroad or even staying close to home.`,
    fullDescription: `Our travel insurance services cover you whether you are traveling abroad or even staying close to home. From emergency services of replacing a lost passport to cash wire or re booking canceled flights, we have it all. Additional coverage is provided to shield you from surprise expenses even if you have some protection already. Travel smart, travel safe.`
  },
  {
    id: 9,
    name: `AFTER-HOURS`,
    image: afterHoursImg,
    shortDescription: `If something goes awry, don't worry we have got your back.`,
    fullDescription: `If something goes awry, don't worry we have got your back. With our after-hours service, whether it's a last-minute booking, an urgent request, or an unexpected change, you will always have help. Just contact us, and we will always be there, no matter the time.`
  }
];