import {
  CustomerCreatedEvent,
  CustomerUpdatedEvent,
  EventEntity,
  EventName,
  SubscriptionCreatedEvent,
  SubscriptionUpdatedEvent,
} from '@paddle/paddle-node-sdk';
import { prisma } from '@/lib/prisma';

export class ProcessWebhook {
  async processEvent(eventData: EventEntity) {
    switch (eventData.eventType) {
      case EventName.SubscriptionCreated:
      case EventName.SubscriptionUpdated:
        await this.updateSubscriptionData(eventData);
        break;
      case EventName.CustomerCreated:
      case EventName.CustomerUpdated:
        await this.updateCustomerData(eventData);
        break;
    }
  }

  private async updateSubscriptionData(eventData: SubscriptionCreatedEvent | SubscriptionUpdatedEvent) {
    await prisma.subscription.upsert({
      where: { subscriptionId: eventData.data.id },
      update: {
        subscriptionStatus: eventData.data.status,
        priceId: eventData.data.items[0].price?.id ?? null,
        productId: eventData.data.items[0].price?.productId ?? null,
        scheduledChange: eventData.data.scheduledChange?.effectiveAt ?? null,
        updatedAt: new Date(),
      },
      create: {
        subscriptionId: eventData.data.id,
        subscriptionStatus: eventData.data.status,
        priceId: eventData.data.items[0].price?.id ?? null,
        productId: eventData.data.items[0].price?.productId ?? null,
        scheduledChange: eventData.data.scheduledChange?.effectiveAt ?? null,
        customerId: eventData.data.customerId,
      },
    });
  }

  private async updateCustomerData(eventData: CustomerCreatedEvent | CustomerUpdatedEvent) {
    await prisma.customer.upsert({
      where: { customerId: eventData.data.id },
      update: {
        email: eventData.data.email,
        updatedAt: new Date(),
      },
      create: {
        customerId: eventData.data.id,
        email: eventData.data.email,
      },
    });
  }
}
