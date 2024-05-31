import { useCompany } from '../../../../hooks/use-company';
import { Button } from '../../../../ui/button';
import { Skeleton } from '../../../../ui/skeleton';
import { usePayrollSystemContext } from '../../context';
import { BaseCard } from '../base-card';
import React from 'react';

const ConnectedAction = () => {
  return (
    <Button className='sc-w-full sc-whitespace-normal' disabled>
      Connected
    </Button>
  );
};

export const ConnectedCard = () => {
  const { payrollSystem } = usePayrollSystemContext();
  const { data: company } = useCompany();

  let description;

  if (!company) {
    description = (
      <div className='sc-flex sc-flex-col sc-gap-[0.4rem]'>
        <Skeleton className='sc-h-5 sc-w-full' />
        <Skeleton className='sc-h-5 sc-w-full' />
        <Skeleton className='sc-h-5 sc-w-full' />
      </div>
    );
  } else {
    description = (
      <p className='sc-font-light'>
        You have successfully connected{' '}
        <span className='sc-font-mainMedium'>{payrollSystem.name}</span> to your{' '}
        <span className='sc-font-mainMedium'>{company?.account.name}</span>{' '}
        account.
      </p>
    );
  }

  return (
    <BaseCard
      description={description}
      banner={undefined}
      action={<ConnectedAction />}
    />
  );
};
