import { Blockchain, SandboxContract } from '@ton-community/sandbox';
import '@ton-community/test-utils';
import { Address, toNano } from 'ton-core';
import { Task3 } from '../wrappers/Task3';
import { randomAddress } from '@ton-community/test-utils';

describe('Task3', () => {
    let blockchain: Blockchain;
    let task3: SandboxContract<Task3>;

    const j1 = randomAddress();
    const j2 = randomAddress();

    beforeEach(async () => {
        blockchain = await Blockchain.create();
        task3 = blockchain.openContract(
            await Task3.fromInit(Address.parse('EQA4Q_EgtBOEdvY4H748kx8hmOe_xEVJ5rTV1U-0VUb4GkrF'), j1, j2)
        );
        const deployer = await blockchain.treasury('deployer');
        const deployResult = await task3.send(
            deployer.getSender(),
            {
                value: toNano('0.05'),
            },
            {
                $$type: 'Deploy',
                queryId: 0n,
            }
        );
        expect(deployResult.transactions).toHaveTransaction({
            from: deployer.address,
            to: task3.address,
            deploy: true,
            success: true,
        });
    });

    it('test', async () => {});
});
