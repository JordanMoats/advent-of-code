with open('2020/input/1.txt') as file:
    content = file.read()

def a():
    lines = content.split('\n')[:-1]
    nums = [int(x) for x in lines]
    nums = sorted(nums)
    
    left = 0;
    right = len(nums) - 1
    while left < right:
        sum = nums[left] + nums[right]
        if sum < 2020:
            left += 1
        elif sum > 2020:
            right -=1
        else:
            break
    print(nums[left], nums[right], nums[left] * nums[right])
            
def b():
    lines = content.split('\n')[:-1]
    nums = [int(x) for x in lines]
    nums = sorted(nums)

    n = len(nums)
    for i in range(n - 2):
        left = i + 1
        right = n - 1

        while left < right:
            if nums[i] + nums[left] + nums[right] < 2020:
                left += 1
            elif nums[i] + nums[left] + nums[right] > 2020:
                right -= 1
            else:
                print(nums[i], nums[left], nums[right], nums[i] * nums[left] * nums[right])
                break
a()
b()
