import {ActionProcessor} from '../actionProcessor'
import {ActionConstants} from '../constants'
import {mockInput} from './testutils'
import {FakeGithubRepo} from './fakeGithubRepo'

test('should not process action if pattern does not match for branch', () => {
  mockInput(
    ActionConstants.BASE_BRANCH_PATTERN_INPUT_KEY,
    '^feature/[a-zA-Z0-9]+$'
  )

  const createBranchRuleSpy = jest.fn().mockImplementationOnce(Promise.resolve)
  FakeGithubRepo.prototype.createBranchRule = createBranchRuleSpy

  const fakeGithubRepo = new FakeGithubRepo('owner', 'repo', 'foo')
  const actionProcessor = new ActionProcessor(fakeGithubRepo)

  actionProcessor.processAction(
    'foo',
    'refType',
    ActionConstants.CREATE_EVENT_NAME
  )

  expect(createBranchRuleSpy).not.toHaveBeenCalled()
})

test('should not process create action if pattern matches but reftype does not', () => {
  mockInput(
    ActionConstants.BASE_BRANCH_PATTERN_INPUT_KEY,
    '^feature/[a-zA-Z0-9]+$'
  )

  const createBranchRuleSpy = jest.fn().mockImplementationOnce(Promise.resolve)
  FakeGithubRepo.prototype.createBranchRule = createBranchRuleSpy

  const fakeGithubRepo = new FakeGithubRepo('owner', 'repo', 'foo')
  const actionProcessor = new ActionProcessor(fakeGithubRepo)

  actionProcessor.processAction(
    'feature/foo',
    'refType',
    ActionConstants.CREATE_EVENT_NAME
  )

  expect(createBranchRuleSpy).not.toHaveBeenCalled()
})

test('should not process delete action if pattern matches but reftype does not', () => {
  mockInput(
    ActionConstants.BASE_BRANCH_PATTERN_INPUT_KEY,
    '^feature/[a-zA-Z0-9]+$'
  )

  const deleteBranchRuleSpy = jest.fn().mockImplementationOnce(Promise.resolve)
  FakeGithubRepo.prototype.deleteBranchRule = deleteBranchRuleSpy

  const fakeGithubRepo = new FakeGithubRepo('owner', 'repo', 'foo')
  const actionProcessor = new ActionProcessor(fakeGithubRepo)

  actionProcessor.processAction(
    'feature/foo',
    'refType',
    ActionConstants.DELETE_EVENT_NAME
  )

  expect(deleteBranchRuleSpy).not.toHaveBeenCalled()
})

test('should process create action if pattern matches branch name', () => {
  mockInput(
    ActionConstants.BASE_BRANCH_PATTERN_INPUT_KEY,
    '^feature/[a-zA-Z0-9]+$'
  )

  const createBranchRuleSpy = jest.fn().mockImplementationOnce(Promise.resolve)
  FakeGithubRepo.prototype.createBranchRule = createBranchRuleSpy

  const branchName = 'feature/foo'
  const fakeGithubRepo = new FakeGithubRepo('owner', 'repo', branchName)
  const actionProcessor = new ActionProcessor(fakeGithubRepo)

  actionProcessor.processAction(
    branchName,
    ActionConstants.BRANCH_REF_TYPE,
    ActionConstants.CREATE_EVENT_NAME
  )

  expect(createBranchRuleSpy).toHaveBeenCalled()
})

test('should process delete action if pattern matches branch name', () => {
  mockInput(
    ActionConstants.BASE_BRANCH_PATTERN_INPUT_KEY,
    '^feature/[a-zA-Z0-9]+$'
  )

  const deleteBranchRuleSpy = jest.fn().mockImplementationOnce(Promise.resolve)
  FakeGithubRepo.prototype.deleteBranchRule = deleteBranchRuleSpy

  const branchName = 'feature/foo'
  const fakeGithubRepo = new FakeGithubRepo('owner', 'repo', branchName)
  const actionProcessor = new ActionProcessor(fakeGithubRepo)

  actionProcessor.processAction(
    branchName,
    ActionConstants.BRANCH_REF_TYPE,
    ActionConstants.DELETE_EVENT_NAME
  )

  expect(deleteBranchRuleSpy).toHaveBeenCalled()
})
