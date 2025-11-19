import React from "react";
import PricingSection, { PricingSectionComponentProps } from "./PricingSection";
import { ComponentConfig } from "@measured/puck";
import { Event } from "@/graphql/types";
import client from '@/lib/apollo-client';
import { gql } from "@apollo/client";

export const PricingSectionBlock: ComponentConfig<{
    props: PricingSectionComponentProps;
    fields: {
        userField: {
            type: "userField";
            option: boolean;
        };
    };
}> = {
    fields: {
        event: {
            type: "external",
            placeholder: "Select an event",
            showSearch: false,
            renderFooter: ({ items }) => {
                return (
                    <div>
                        {items.length} result{items.length === 1 ? "" : "s"}
                    </div>
                );
            },
            fetchList: async ({ query, filters }) => {
                // log query and filters
                console.log(query, filters);
                const { data } = await client.query<{ events: Pick<Event, 'id' | 'title' | 'description' | 'ticketTiers'>[] }>({
                    query: gql`
                        query GetEvents {
                            events {
                                id
                                title
                                description
                                ticketTiers {
                                    id
                                    name
                                    price
                                    available
                                }
                            }
                        }
                    `,
                });
                return data?.events
                    .map((event, idx) => ({
                        index: idx,
                        title: event.title,
                        description: event.description,
                        ticketTiers: event.ticketTiers,
                    }))|| [];
            },
            mapRow: (item) => ({
                title: item.title,
                description: <span>{item.description}</span>,
                ticketTiers: item.ticketTiers,
            }),
            mapProp: (result) => {
                console.log(result);
                return { id: result.id, title: result.title, description: result.description, ticketTiers: result.ticketTiers };
            },
            getItemSummary: (item) => item.title,
        },
    },

    /**
     * The resolveData method allows us to modify component data after being
     * set by the user.
     *
     * It is called after the page data is changed, but before a component
     * is rendered. This allows us to make dynamic changes to the props
     * without storing the data in Puck.
     *
     * For example, requesting a third-party API for the latest content.
     */
    resolveData: async ({ props }, { changed }) => {
        if (!props.event)
            return { props, readOnly: { event: false } };

        if (!changed.event) {
            return { props };
        }

        return {
            props: {
                event: props.event,
                columns: props.columns,
            },
            readOnly: { event: false },
        };
    },
    render: ({ ...props }) => <PricingSection {...props} />,
};
